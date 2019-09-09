"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const models_1 = require("./models");
dotenv.load();
const storageFactory = {
    create() {
        mongoose.connect(process.env.CONN_STRING || "mongodb://localhost:27017/mockproxy");
        return this;
    },
    saveBasePath(key, basePath) {
        if (!(key && basePath)) {
            return false;
        }
        models_1.KeyModel.findOneAndUpdate({ key }, { basePath: basePath }, { upsert: true });
        return true;
    },
    getBasePath(key) {
        if (!key) {
            return;
        }
        return models_1.KeyModel.find(key);
    },
    get(key, url) {
        if (!key) {
            return;
        }
        return models_1.RequestModel.find({ key, url });
    },
    save(key, url, value) {
        if (!key) {
            return false;
        }
        models_1.RequestModel.findOneAndUpdate({ key, url }, { body: value }, { upsert: true });
        return true;
    }
};
module.exports = storageFactory;
//# sourceMappingURL=factory.js.map