'use strict';

const { tables } = require('../models');
const { poll } = tables;

module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/vote') {
    if (!req.headers.authorization) {
      next({code: 401, message: 'Invalid Invitation'});
    }
  
    try {
      let invitation = req.headers.authorization.split(' ')[1];
      if (poll.validateInvite(invitation)){
        next();
      }
    } catch (e) {
      next({ message: 'Router Error: unable to validate invitation', cause: e });
    }
  } else {
    next();
  }
}