const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('./src/public'));

module.exports = app;
