'use strict';

require('dotenv').config();
const middlewares = require('./middlewares');

module.exports = {
  authorization: middlewares.authorization,
  bearerAuth: middlewares.bearerAuth
}