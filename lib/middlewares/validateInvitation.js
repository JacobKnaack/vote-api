'use strict';

const { poll } = require('../models');

module.exports = (req, res, next) => {
  try {

  } catch (e) {
    next({ message: 'Router Error: unable to validate invitation', cause: e });
  }
}