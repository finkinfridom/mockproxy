const dotenv = require('dotenv');
dotenv.load();
const express = require('express');
const morgan = require('morgan');
const debug = require("debug")("mockproxy:server");
const errorhandler = require('errorhandler');
const request = require('request');
const app = express();
app.set('etag', false);
app.disable('x-powered-by');
const url = require('url');
const storage = require('./libs/storage.js');
const factory = storage.create();
debug('environment:' + process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('common'));
    app.use(errorhandler());
}

app.get('*', (req, res, next) => {
    const querystring = url.parse(req.url).search || '';
    const path = req.path || '';
    const requrl = `${req.protocol}://${req.headers.host}${path}${querystring}`;
    const authKey = req.headers.mp_key;
    let storageKey = undefined;
    if (!authKey) {
        debug('no mp_key found. Pass-through only');
    }
    else {
        storageKey = factory.getSecret(authKey, requrl, req.headers);
    }
    let storedValue;
    if (storedValue = factory.get(storageKey)) {
        debug('from storage');
        if (storedValue.error) {
            next(storedValue.error);
            return;
        }
        res.type(storedValue.headers['content-type']).status(storedValue.statusCode).send(storedValue.body);
        return;
    }
    debug(`URL requested: ${requrl}`);
    request({
        'url': requrl,
        headers: req.headers,
    }, (error, response, body) => {
        if (error) {
            factory.save(storageKey, {
                error: error
            });
            next(error);
            return;
        }
        factory.save(storageKey, {
            body: body,
            headers: response.headers,
            statusCode: response.statusCode
        });
        res.type(response.headers['content-type']).status(response.statusCode).send(body);
    });
});

app.listen(process.env.SERVER_PORT, () => {
    debug('server listening on port ' + process.env.SERVER_PORT);
});