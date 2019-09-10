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
				tags: ["management"],
				summary: "Create new proxy with specified key"
			},
			produces: ["application/json"],
			responses: {
				200: {
					description: "success"
				}
			},
			parameters: [
				{
					name: "basePath",
					in: "body",
					description: "the fully qualified URL",
					required: true,
					schema: {
						$ref: "#/definitions/CreateKeyBody"
					}
				},
				{
					name: "mp_key",
					in: "path",
					required: true
				}
			]
		},
		"/api/v1/{mp_key}/{path}": {
			get: {
				tags: ["distribution"],
				summary: "Get mocked request for specified key and path"
			},
			produces: ["application/json"],
			responses: {
				200: {
					schema: {
						$ref: "#/definitions/MockedResponse"
					}
				}
			},
			parameters: [
				{
					name: "mp_key",
					in: "path",
					required: true
				},
				{
					name: "path",
					in: "path",
					required: true
				}
			]
		},
		"/api/v1/keys": {
			get: {
				tags: ["distribution"],
				summary: "Get all keys"
			},
			produces: ["application/json"],
			responses: {
				200: {
					schema: {
						$ref: "#/definitions/KeyResponse"
					}
				}
			}
		},
		"/api/v1/requests/{mp_key}": {
			get: {
				tags: ["distribution"],
				summary: "Get all requests for specified key"
			},
			produces: ["application/json"],
			responses: {
				200: {
					schema: {
						$ref: "#/definitions/RequestResponse"
					}
				}
			},
			parameters: [
				{
					name: "mp_key",
					in: "path",
					required: true
				}
			]
		}
	},
	definitions: {
		CreateKeyBody: {
			properties: {
				basePath: {
					required: true,
					type: "string",
					example: "http://www.mocky.io"
				}
			}
		},
		MockedResponse: {
			type: "string"
		},
		KeyResponse: {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				basePath: {
					type: "string"
				}
			}
		},
		RequestResponse: {
			type: "object",
			properties: {
				key: {
					type: "string"
				},
				url: {
					type: "string"
				},
				statusCode: {
					type: "number"
				},
				body: {
					type: "string"
				}
			}
		}
	},
	schemes: ["http", "https"],
	consumes: ["*/*"],
	produces: ["*/*"]
};
