"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug")("mockproxy:storage");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const models_1 = require("./models");
dotenv.load();
const storageFactory = {
    create: function () {
        mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`);
        return this;
    },
    get: function (key) {
        if (!key) {
            return;
        }
        return models_1.RequestModel.find(key);
        /* return _storage[key]; */
    },
    getSecret: function (authKey, url, headers) {
        return `${authKey}_${url}_${JSON.stringify(headers)}`;
    },
    save: function (key, value) {
        if (!key) {
            return false;
        }
        models_1.RequestModel.findOneAndUpdate({ storageKey: key }, { body: value }, { upsert: true });
        /* _storage[key] = value; */
        return true;
    }
};
module.exports = storageFactory;
//# sourceMappingURL=factory.js.map