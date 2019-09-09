"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.RequestSchema = new mongoose_1.Schema({
    url: String,
    key: String,
    body: Object
});
exports.RequestSchema.index({ url: -1, key: -1 });
//# sourceMappingURL=requestSchema.js.map