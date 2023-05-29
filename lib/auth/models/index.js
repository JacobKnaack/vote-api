'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./users');
const roleModel = require('./roles');

module.exports = {
  user: null,
  role: null
}
