const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("mockproxy:server");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const zlib = require("zlib");
const rootCas = require("ssl-root-cas").create();
rootCas.addFile(__dirname + "/server.CA.key");

const https = require("https");
const http = require("http");
// rootCas
// 	.addFile(__dirname + "/ssl/01-cheap-ssl-intermediary-a.pem")
// 	.addFile(__dirname + "/ssl/02-cheap-ssl-intermediary-b.pem");

// default for all https requests
// (whether using https directly, request, or another module)
https.globalAgent.options.ca = rootCas;
http.globalAgent.options.ca = rootCas;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
require("dotenv").config();
app.set("etag", false);
app.disable("x-powered-by");
const url = require("url");
const storage = require("./storage/factory");
const factory = storage.create();
const PORT = process.env.PORT || 3000;
debug("environment:" + process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
	app.use(morgan("common"));
	app.use(errorhandler());
}

const getParams = (req, basePath, path) => {
	const querystring = url.parse(req.url).search || "";
	const requrl = `${basePath}/${path}${querystring}`;
	return { querystring, path, requrl };
};

const reply = (authKey, requrl, req, res, next) => {
	debug(`URL requested: ${requrl}`);
	factory.get(authKey, requrl).exec((err, docs) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		if (!(docs && docs.length)) {
			const parsed = url.parse(requrl);
			const headersOptions = {
				"x-proxy-name": "mockproxy",
				"cache-control": "no-cache",
				accept: "*/*",
				"Accept-Encoding": "gzip, deflate, br"
			};
			if (req.headers["content-type"]) {
				headersOptions["content-type"] = req.headers["content-type"];
			}
			if (req.headers["accept-language"]) {
				headersOptions["accept-language"] = req.headers["accept-language"];
			}
			if (req.headers["user-agent"]) {
				headersOptions["user-agent"] = req.headers["user-agent"];
			}
			const requestOptions = {
				host: parsed.host,
				port: parsed.port || parsed.protocol === "http" ? 80 : 443,
				path: parsed.path,
				method: "GET",
				headers: headersOptions
			};
			debug(
				`nothing stored for ${JSON.stringify(requestOptions)} ${JSON.stringify(
					headersOptions
				)}`
			);

			(parsed.protocol === "http" ? http : https)
				.request(requestOptions, response => {
					const chunks = [];
					response.on("data", function(chunk) {
						chunks.push(chunk);
					});
					response
						.on("end", () => {
							const buffer = Buffer.concat(chunks);
							const encoding = response.headers["content-encoding"];
							let body = undefined;
							debug(`encoding ${encoding}`);
							if (encoding == "gzip") {
								body = zlib.gunzipSync(buffer).toString();
							} else if (encoding == "deflate") {
								body = zlib.inflateSync(buffer).toString();
							} else if (encoding == "br") {
								body = zlib.brotliDecompressSync(buffer).toString();
							} else {
								body = buffer.toString();
							}
							debug(`stored body: ${body}`);
							factory.save(
								authKey,
								requrl,
								{
									body,
									headers: response.headers,
									statusCode: response.statusCode
								},
								(err, doc) => {
									if (err) {
										response.status(500).send(err);
										return;
									}
									res
										.type(response.headers["content-type"])
										.status(response.statusCode)
										.send(body);
								}
							);
						})
						.on("error", () => {
							console.log("res", arguments);
						});
				})
				.end();
			return;
		}
		const storedValue = docs[0];
		if (!(storedValue.body && storedValue.headers && storedValue.statusCode)) {
			res.set(500).send("mandatory info are missing from db");
			return;
		}
		debug("from storage");
		if (storedValue.error) {
			next(storedValue.error);
			return;
		}
		res
			.type(storedValue.headers["content-type"] || "text/html")
			.status(storedValue.statusCode)
			.send(storedValue.body);
	});
};
app.get("/", (req, res) => {
	res
		.type("text/html")
		.status(200)
		.send("Welcome to MockProxy");
});
app.get("/favicon.ico", (req, res) => {
	res.sendStatus(200);
});
app.post("/:mp_key", (req, res) => {
	const { basePath } = req.body;
	if (!basePath) {
		res.status(500).send("No basePath provided");
		return;
	}
	factory.saveBasePath(req.params.mp_key, basePath, err => {
		if (err) {
			res.set(500).send(err);
			return;
		}
		res.sendStatus(200);
	});
});
app.get("/:mp_key/*", (req, res, next) => {
	if (!req.params.mp_key) {
		res.set(403).send("no mp_key found in path");
		return;
	}
	factory.getBasePath(req.params.mp_key).exec((err, docs) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		if (!(docs && docs.length)) {
			res.status(404).send(`No basepath found for ${req.params.mp_key}`);
			return;
		}
		const basePath = docs[0].basePath;
		const path = req.params[0];
		const { requrl } = getParams(req, basePath, path);
		reply(req.params.mp_key, requrl, req, res, next);
	});
});
app.get("/:path", (req, res, next) => {
	if (!req.headers.mp_key) {
		res.status(403).send("no mp_key found in headers");
		return;
	}
	const basePath = (factory.getBasePath(req.headers.mp_key) || {}).basePath;
	if (!basePath) {
		res.status(404).send(`No basepath found for ${req.params.mp_key}`);
		return;
	}
	const { requrl } = getParams(req, basePath, req.params.path);
	reply(req.headers.mp_key, requrl, req, res, next);
});
app.listen(PORT, () => {
	debug("server listening on port " + PORT);
});
