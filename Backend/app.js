const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' });

module.exports = app;