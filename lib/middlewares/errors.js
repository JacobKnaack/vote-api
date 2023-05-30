'use strict';

// missing request parameters
const badRequest = (e,ctx) => {
  ctx.status(400).send(e.message || 'Invalid Request Parameters');
}

// missing authorization credentials
const authorization = () => {}

// missing access control values
const authentication = () => {}

// route / resource not found
const notFound = () => {

}

const invalidMethod = () => {

}

const serverError = (e,ctx) => {
  ctx.status(500).send(e.message || 'Internal Server Error');
}

module.exports = (err, req, res, next) => {
  switch(err.code) {
    case 400:
      return badRequest(err,res);
    case 401:
      return authentication();
    case 403:
      return authorization();
    case 404:
      return notFound();
    case 500:
      return serverError();
    default:
      return serverError(err,res); 
  }
}
