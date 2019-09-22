import * as mongoose from "mongoose";
import { RequestModel, KeyModel } from "./models";
import btoa = require("btoa");
import dotenv = require("dotenv");
dotenv.config();
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

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
		const codedUrl = btoa(url);
		return RequestModel.find({ key, codedUrl });
	},
	getRequests(key: string) {
		if (!key) {
			return;
		}
		return RequestModel.find({ key });
	},
	getKeys() {
		return KeyModel.find();
	},
	save(key: string, url: string, value: any, callback: any) {
		if (!key) {
			return false;
		}
		const codedUrl = btoa(url);
		RequestModel.findOneAndUpdate(
			{ key, codedUrl },
			{
				$set: {
					originalUrl: url,
					...value
				}
			},
			{ upsert: true },
			callback
		);
		return true;
	}
};
module.exports = storageFactory;
