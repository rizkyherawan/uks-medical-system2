const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Semua endpoint API diawali /api
app.use('/api', routes);
app.use('/api', notFound);

app.use(errorHandler);

module.exports = app;
