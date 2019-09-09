const package = require("../package.json");
exports.options = {
	swagger: "2.0",
	basePath: "/",
	host: process.env.SWAGGER_HOST || `localhost:${process.env.PORT || 3000}`,
	info: {
		title: package.name,
		description: package.description,
		version: package.version
	},
	externalDocs: {
		url: package.repository,
		description: "Find more info here"
	},
	paths: {
		"/api/v1/{mp_key}": {
			post: {
				summary: "Create new proxy"
			},
			parameters: [
				{
					name: "basePath",
					in: "body",
					description: "the fully qualified URL"
				},
				{
					name: "mp_key",
					in: "path",
					required: true
				}
			]
		}
	},
	schemes: ["http", "https"],
	consumes: ["application/json"],
	produces: ["*/*"]
};
