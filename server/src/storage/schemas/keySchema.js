"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.KeySchema = new mongoose_1.Schema({
    key: String,
    basePath: String
});
exports.KeySchema.index({ key: -1 });
//# sourceMappingURL=keySchema.js.map