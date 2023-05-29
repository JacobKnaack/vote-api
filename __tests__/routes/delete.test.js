'use strict';

const handleDelete = require('../../lib/routes/handleDelete');

describe('DELETE route handler', () => {
  test('Should return a status 200 and no body', async () => {

    let req = {
      model: {
        destroy: jest.fn(),
      },
      params: {
        id: 'test'
      }
    }
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res),
      text: jest.fn(() => res),
    }
    let next = jest.fn();

    await handleDelete(req, res, next);
    expect(req.model.destroy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  })
})