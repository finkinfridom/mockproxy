import { RequestSchema } from "../schemas";
import { model } from "mongoose";
export const RequestModel = model("Request", RequestSchema);
