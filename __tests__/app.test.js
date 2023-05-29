'use strict';

const { sequelize, poll, candidate, vote } = require('../lib/models');
const app = require('../lib/app');
const supertest = require('supertest');
const request = supertest(app);

let testPoll = null;
let testCandidate1 = null;
let testCandidate2 = null;

beforeAll(async () => {
  await sequelize.sync();
  // create a test Poll and some test Candidates
})
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the app server routes', () => {
  test('Should return a poll on POST /poll', async () => {
    let response = await request.post('/api/v1/poll').send({
      name: 'test'
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test');
  });

  // TODO: should be able to create candidates and votes with associated data values
  // test('Should return a valid Poll and Candidates on GET /poll', async () => {
  //   let response = await request.get('/api/v1/poll');


  // });
});