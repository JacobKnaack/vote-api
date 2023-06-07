'use strict';

const jwt = require('jsonwebtoken');
const { authorization } = require('../../lib/auth');

// you will need to generate a new access token in order to run these tests
let token = process.env.AUTH0_TEST_TOKEN;

beforeAll(() => {
  let payload = jwt.decode(token);
  expect(Date.now() <= payload.exp * 1000).toBeTruthy();
});

describe('Testing the Authorization Middleware', () => {
  test('Should call next without an Error if a valid token is present', async () => {
    let req = {
      headers: {
        authorization: `Bearer ${token}`,
      }
    };
    let res = {};
    let next = jest.fn((err) => {
      expect(err).toBe(undefined);
      expect(req.user).toBeTruthy();
    });

    authorization(req, res, next);
  });
});