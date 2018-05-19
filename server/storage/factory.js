const debug = require("debug")("mockproxy:storage");

import dotenv from "dotenv";
import mongoose from "mongoose";
import { RequestModel } from "models";
dotenv.load();

const _storage = {};
const storageFactory = {
  create: function() {
    mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${
        process.env.DB_HOST
      }/${process.env.DB_DATABASE}`
    );
    return this;
  },
  get: function(key) {
    if (!key) {
      return;
    }
    return (RequestModel.find(key) || {}).body;
    /* return _storage[key]; */
  },
  getSecret: function(authKey, url, headers) {
    return `${authKey}_${url}_${JSON.stringify(headers)}`;
  },
  save: function(key, value) {
    if (!key) {
      return false;
    }
    RequestModel.findOneAndUpdate(
      { storageKey: key },
      { body: value },
      { upsert: true }
    );
    /* _storage[key] = value; */
    return true;
  }
};
module.exports = storageFactory;
