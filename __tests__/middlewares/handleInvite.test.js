'use strict';

const { handleInvite } = require('../../lib/middlewares');
const { sequelize, tables } = require('../../lib/models');
process.env.INVITATION_SECRET = 'TEST_STRING';

let { poll } = tables;
let testPoll = null;

beforeAll(async () => {
  try {
    await sequelize.sync();
    testPoll = await poll.create({ name: 'invitation-test' });
  } catch (e) {
    console.log(e);
  }
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the invitation handler route', () => {
  test('Should respond with a valid invitation with a valid pollId', async () => {
    let req = {
      params: { pollId: testPoll.id }
    };
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res),
      text: jest.fn(() => res),
    };
    let next = jest.fn();

    await handleInvite(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  test('Should throw and error without a valid pollId', async() => {
    let req = { params: {} }
    let res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
      json: jest.fn(() => res),
      text: jest.fn(() => res),
    };
    let next = jest.fn();

    await handleInvite(req, res, next);
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith({ code: 400, message: 'Invalid Request, missing parameters' });
  });
})