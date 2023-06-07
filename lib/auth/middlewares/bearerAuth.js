'use strict';

// check for appropriate authentication tokens for a given User and Resource
module.exports = (req, res, next) => {
 
  const auth = req.headers.authorization.split(' ');

  // check if token is an invitation or a user token
  switch (auth[0].toLowerCase()) {
    case 'bearer':
      req.token = auth[0];
      next();
      break;
    case 'invite':
      req.invitation = auth[0];
      next();
      break;
    default:
      next();
  }
}
