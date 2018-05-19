import { Schema } from "mongoose";

const RequestSchema = new Schema({
    url: String,
    body: Object,
    storageKey:String
});

RequestSchema.index({ storageKey:-1});
export RequestSchema;