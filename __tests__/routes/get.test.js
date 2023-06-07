'use strict';

const { handleGet } = require('../../lib/routes/handlers');
const { v4: uuid } = require('uuid');

describe('testing create route handler', () => {
  test('Calls the findByPk model method when id is present in params', async () => {

    const req = {
      model: {
        findByPk: jest.fn(() => ({ id: 'test' }))
      },
      params: {
        id: uuid(),
      }
    };
    const res = {
      send: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    }
    const next = jest.fn();

    await handleGet(req, res, next);
    expect(req.model.findByPk).toHaveBeenCalledWith(req.params.id, {});
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      count: 1,
      records: {
        id: 'test'
      }
    });
  });

  test('Should call the findAll model method with no id present on params', async () => {
    const req = {
      model: {
        findAll: jest.fn(() => ([{ id: 'test' }]))
      },
      params: {}
    };
    const res = {
      send: jest.fn(() => res),
      status: jest.fn(() => res),
      json: jest.fn(() => res),
    }
    const next = jest.fn();

    await handleGet(req, res, next);
    expect(req.model.findAll).toHaveBeenCalledWith({});
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      count: 1,
      records: [{
        id: 'test'
      }]
    });
  });
});