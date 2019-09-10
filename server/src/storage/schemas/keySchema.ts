import { Schema } from "mongoose";

export const KeySchema: Schema = new Schema({
	key: String,
	basePath: String
});

KeySchema.index({ key: -1 });
