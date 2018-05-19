import { RequestSchema } from "schemas";
import { mongoose } from "mongoose";
const RequestModel = mongoose.Model("Request", RequestSchema);

export RequestModel;