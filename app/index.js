const { join } = require('path');
const { STATUS_CODES } = require('http');

const express = require('express');
const logger = require('morgan');

const config = require('../config');

const app = express();

const { NODE_ENV } = process.env;

app.disable('x-powered-by');

app.set('views', join(__dirname, '../views'));
app.set('view engine', 'pug');

app.get('/healthz', (req, res) => {
  res.type('text/plain').send(STATUS_CODES[200]);
});

app.use(logger(NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.static(
  join(__dirname, '../public'),
  { maxAge: NODE_ENV === 'production' ? '7d' : 0 },
));

app.use('/web_modules/@fortawesome', express.static(
  join(__dirname, '../node_modules/@fortawesome'),
  { maxAge: NODE_ENV === 'production' ? '7d' : 0 },
));

app.get('/', (req, res) => {
  res.render('index', config);
});

app.use((req, res, _) => {
  res.status(404).render('error', {
    background: config.background,
    color: config.color,
    title: STATUS_CODES[404],
    status: 404,
    message: STATUS_CODES[404],
  });
});

app.use((err, req, res, _) => {
  res.status(500).render('error', {
    background: config.background,
    color: config.color,
    title: STATUS_CODES[500],
    status: 500,
    message: NODE_ENV === 'production' ? STATUS_CODES[500] : err.message,
  });
});

module.exports = app;
