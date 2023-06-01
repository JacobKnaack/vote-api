'use strict';

const { errorHandler } = require('../../lib/middlewares');

describe('Testing the error handler middleware', () => {
  test('Should return a 400', () => {
    let err = {
      code: 400,
      message: '400 error test',
    }
    let ctx = {
      status: jest.fn(() => ctx),
      json: jest.fn(() => ctx),
      send: jest.fn(() => ctx),
      text: jest.fn(() => ctx),
    }
    errorHandler(err, null, ctx, null);
    expect(ctx.status).toHaveBeenCalledWith(400);
  });

  xtest('Should return a 401', () => {
    let err = {
      code: 401,
      message: '401 error test',
    }
    let ctx = {
      status: jest.fn(() => ctx),
      json: jest.fn(() => ctx),
      send: jest.fn(() => ctx),
      text: jest.fn(() => ctx),
    }
    expect(true).toBe(false);
  });

  xtest('Should return a 403', () => {
    let req = {}
    let res = {}
    let next = jest.fn();
    expect(true).toBe(false);
  });

  xtest('Should return a 404', () => {
    let req = {}
    let res = {}
    let next = jest.fn();
    expect(true).toBe(false);

  });
  xtest('Should return a 500', () => {
    let req = {}
    let res = {}
    let next = jest.fn();
    expect(true).toBe(false);

  });
});

