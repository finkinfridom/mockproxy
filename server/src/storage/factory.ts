import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { RequestModel, KeyModel } from "./models";
const debug = require("debug")("mockproxy:factory");
dotenv.load();

const storageFactory = {
	create() {
		mongoose.connect(
			process.env.MONGODB_URI || "mongodb://localhost:27017/mockproxy"
		);
		return this;
	},
	saveBasePath(key: string, basePath: string, callback: any) {
		if (!(key && basePath)) {
			return false;
		}
		KeyModel.findOneAndUpdate(
			{ key },
			{ $set: { basePath } },
			{ upsert: true },
			callback
		);
		return true;
	},
	getBasePath(key: string) {
		if (!key) {
			return;
		}
		return KeyModel.find({ key });
	},
	get(key: string, url: string) {
		if (!key) {
			return;
		}
		return RequestModel.find({ key, url });
	},
	save(key: string, url: string, value: any, callback: any) {
		if (!key) {
			return false;
		}
		RequestModel.findOneAndUpdate(
			{ key, url },
			{ $set: value },
			{ upsert: true },
			callback
		);
		return true;
	}
};
module.exports = storageFactory;
