'use strict';

const { modelParams } = require('../../lib/middlewares/');

describe('Testing the model param middleware', () => {
  test('should add a function to the request object', () => {
    let models = {test: jest.fn()}
    let req = {
      params: { model: 'test' }
    }
    let res = {
      send: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    }
    let next = jest.fn();

    modelParams(models)(req, res, next);
    expect(req.model).toBeTruthy();
    expect(req.model).toEqual(models.test);
    expect(next).toHaveBeenCalledWith();
  });
})