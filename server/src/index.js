const express = require("express");
const morgan = require("morgan");
const debug = require("debug")("mockproxy:server");
const errorhandler = require("errorhandler");
const request = require("request");
const bodyParser = require("body-parser");

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
			debug(`nothing stored`);
			request(
				{
					url: requrl,
					headers: req.headers
				},
				(error, response, body) => {
					if (error) {
						factory.save(
							authKey,
							requrl,
							{
								error
							},
							(err, doc) => {
								debug(err, doc);
								next(error);
							}
						);
						return;
					}
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
								res.status(500).send(err);
								return;
							}
							res
								.type(response.headers["content-type"])
								.status(response.statusCode)
								.send(body);
						}
					);
				}
			);
			return;
		}
		const storedValue = docs[0];
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
