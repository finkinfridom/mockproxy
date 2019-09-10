import { Schema } from "mongoose";

export const RequestSchema: Schema = new Schema({
	url: String,
	key: String,
	body: Object,
	headers: Object,
	statusCode: Number
});

RequestSchema.index({ url: -1, key: -1 });
