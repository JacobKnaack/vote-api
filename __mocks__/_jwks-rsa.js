'use strict';

// TODO: Mock the signing Key function so we can test our authorization middlewares
module.exports = jest.fn(config => ({
  getSigningKey: jest.fn((kid, callback) => {});
}));
