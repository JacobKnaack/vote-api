'use strict';

const { handlePut } = require('../../lib/routes/handlers');

describe('PUT route handler', () => {
  test('Should return a new record', async () => {
    let req = {
      model: {
        upsert: jest.fn(record => [record, false]),
      },
      params: {
        id: 'test'
      },
      body: {
        name: 'test',
      }
    }
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res),
      text: jest.fn(() => res),
    }
    let next = jest.fn();

    await handlePut(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: 'test',
      name: 'test'
    });
  });
});