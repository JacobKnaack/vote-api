'use strict';

const handlePost = require('../../lib/routes/handlePost');

describe('testing create route handler', () => {
  test('Calls the create model method', async () => {

    const req = {
      body: {
        test: 'test'
      },
      model: {
        create: jest.fn(() => ({id: 'test'}))
      }
    };
    const res = {
      send: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    }
    const next = jest.fn();

    await handlePost(req, res, next);
    expect(req.model.create).toHaveBeenCalledWith(req.body);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
