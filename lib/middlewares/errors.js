'use strict';

// missing request parameters
const badRequest = (e,ctx) => {
  ctx.status(400).send(JSON.stringify({
    message: 'Invalid Request Parameters', ...e
  }));
}

// missing authorization credentials
const authorization = (e, ctx) => {
  ctx.status(403).send(JSON.stringify({
    message: 'Not Authorized', ...e
 }));
}

// missing access control values
const authentication = (e, ctx) => {
  ctx.status(401).send(JSON.stringify({
    message: 'Invalid Credentials', ...e
  }));
}

// route / resource not found
const notFound = (e, ctx) => {
  ctx.status(404).send(e.message || 'Not Found');
}

const invalidMethod = (e, ctx) => {
  ctx.status(405).send(JSON.stringify({
    message: 'Method unavailable', ...e
  }));
}

const serverError = (e,ctx) => {
  ctx.status(500).send(e.message || 'Internal Server Error');
}

module.exports = (err, req, res, next) => {
  switch(err.code) {
    case 400:
      return badRequest(err,res);
    case 401:
      return authentication(err, res);
    case 403:
      return authorization(err, res);
    case 404:
      return notFound(err, res);
    case 500:
      return serverError(err, res);
    default:
      return serverError(err,res); 
  }
}
