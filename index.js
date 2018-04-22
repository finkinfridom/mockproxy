const express = require('express');
const morgan = require('morgan');
const debug = require("debug")("mockproxy");
const errorhandler = require('errorhandler');
const app = express();
if (process.env.NODE_ENV === 'development') {
    debug('development environment');
    app.use(morgan('common'));
    // only use in development 
    app.use(errorhandler());
}
app.get('*', (req, res) => {
    res.send(JSON.stringify('ok'));
});

app.listen(3000, () => {
    debug('listening on port 3000');
});