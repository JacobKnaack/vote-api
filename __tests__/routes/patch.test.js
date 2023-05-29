'use strict';

const handlePatch = require('../../lib/routes/handlePatch');
const { v4: uuid } = require('uuid');

describe('testing the PATCH handler', () => {
  test('Should call the update method', async () => {
    const req = {
      params: {
        id: uuid(),
      },
      body: {
        name: 'test'
      },
      model: {
        update: jest.fn()
      }
    }
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res)
    }
    const next = jest.fn();

    await handlePatch(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(req.model.update).toHaveBeenCalled();
  });
})