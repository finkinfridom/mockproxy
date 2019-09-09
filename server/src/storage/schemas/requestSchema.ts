import { Schema } from "mongoose";

export const RequestSchema: Schema = new Schema({
	url: String,
	body: Object,
	storageKey: String
});

RequestSchema.index({ storageKey: -1 });
