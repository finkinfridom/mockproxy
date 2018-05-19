const debug = require("debug")("mockproxy:storage");
const _storage = {};
const storageFactory = {
    create: function () {
        //init storage. temporarily in-memory
        return this;
    },
    get: function (key) {
        if (!key) {
            return;
        }
        return _storage[key];
    },
    getSecret: function (authKey, url, headers) {
        return `${authKey}_${url}_${JSON.stringify(headers)}`;
    },
    save: function (key, value) {
        if (!key) {
            return false;
        }
        _storage[key] = value;
        return true;
    }
};
module.exports = storageFactory;