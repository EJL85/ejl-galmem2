const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const coffees = require("./routes/coffees");

app.use(bodyParser.json());

app.use("/coffees", coffees);

app.use(notFound)
app.use(errorHandler)

// eslint-disable-next-line
function notFound(req, res, next) {
    const url = req.originalUrl
    if (!/favicon\.ico$/.test(url) && !/robots\.txt$/.test(url)) {
        // Don't log less important (automatic) browser requests
        console.error('[404: Requested file not found] ', url)
    }
    res.status(404).send({error: 'Url not found', status: 404, url})
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({error: err.message, stack, url: req.originalUrl})
}

module.exports = app;
