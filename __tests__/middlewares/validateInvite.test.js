'use strict';

const { sequelize, tables } = require('../../lib/models');
const { authenticateInvite } = require('../../lib/middlewares');

let { poll } = tables;
let testPoll = null;

beforeAll(async () => {
  await sequelize.sync();
  testPoll = await poll.create({name: 'test-poll'});
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Validate Invite Middleware', () => {
  test('Should call next on valid invitation', () => {
    let req = {
      headers: {
        authorization: `Bearer ${testPoll.generateInvite()}`
      }
    }
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res),
      text: jest.fn(() => res),
    }
    let next = jest.fn();

    authenticateInvite(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  test('Should call next with a 401 error if no header is present', () => {
    let req = {
      headers: {}
    }
    let res = {}
    let next = jest.fn()

    authenticateInvite(req, res, next);
    expect(next).toHaveBeenCalled();
  })
});