const dotenv = require("dotenv");
dotenv.load();
const debug = require("debug")("mockproxy:sampleclient");
const request = require("request");
debug("starting request to ::" + process.env.SERVER_PORT);
request(
	{
		url: "http://www.smashingmagazine.com/",
		headers: {
			//sample value to test workflow
			mp_key: "f2012b10a7b0434885a1db754d74fb09"
		},
		proxy: "http://localhost:" + process.env.SERVER_PORT
	},
	(error, response, body) => {
		debug("URL", "http://www.smashingmagazine.com/");
		debug(`statusCode: ${response.statusCode}`);
		debug(`content-type: ${response.headers["content-type"]}`);
		debug(`all headers: ${JSON.stringify(response.headers, null, 2)}`);
		// debug('body', body);
	}
);

request(
	{
		url: "http://non.existing.url/",
		headers: {
			//sample value to test workflow
			mp_key: "f2012b10a7b0434885a1db754d74fb09"
		},
		proxy: "http://localhost:" + process.env.SERVER_PORT
	},
	(error, response, body) => {
		debug("URL", "http://non.existing.url/");
		debug(`statusCode: ${response.statusCode}`);
		debug(`content-type: ${response.headers["content-type"]}`);
		debug(`all headers: ${JSON.stringify(response.headers, null, 2)}`);
	}
);
