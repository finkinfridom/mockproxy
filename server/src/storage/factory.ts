const debug = require("debug")("mockproxy:storage");

import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { RequestModel } from "./models";
dotenv.load();

const storageFactory = {
	create: function() {
		mongoose.connect(
			`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${
				process.env.DB_HOST
			}/${process.env.DB_DATABASE}`
		);
		return this;
	},
	get: function(key: string) {
		if (!key) {
			return;
		}
		return RequestModel.find(key);
		/* return _storage[key]; */
	},
	getSecret: function(authKey: string, url: string, headers: object) {
		return `${authKey}_${url}_${JSON.stringify(headers)}`;
	},
	save: function(key: string, value: any) {
		if (!key) {
			return false;
		}
		RequestModel.findOneAndUpdate(
			{ storageKey: key },
			{ body: value },
			{ upsert: true }
		);
		/* _storage[key] = value; */
		return true;
	}
};
module.exports = storageFactory;
