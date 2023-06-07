'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI,
});

// Match the JWT's key to your Auth0 Account Key so we can validate it
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// check for appropriate access on request headers
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, (err, user) => {
      if (err) {
        throw new Error(err);
      } else {
        req.user = user;
        next();
      }
    });
  } catch (e) {
    next({ code: 401, message: "Not Authorized", cause: err});
  }
}
