import { KeySchema } from "../schemas";
import { model } from "mongoose";
export const KeyModel = model("Key", KeySchema);
