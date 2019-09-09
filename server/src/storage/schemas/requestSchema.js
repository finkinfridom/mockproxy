"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.RequestSchema = new mongoose_1.Schema({
    url: String,
    body: Object,
    storageKey: String
});
exports.RequestSchema.index({ storageKey: -1 });
//# sourceMappingURL=requestSchema.js.map