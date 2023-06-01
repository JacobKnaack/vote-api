'use strict';

const { sequelize, tables } = require('../lib/models');
const app = require('../lib/app');
const supertest = require('supertest');
const request = supertest(app);

const { poll, candidate } = tables;
let testPoll = null;
let testInvitation = null;
let testCandidate1 = null;
let testCandidate2 = null;

beforeAll(async () => {
  await sequelize.sync();
  // create a test Poll and some test Candidates
  testPoll = await poll.create({ name: 'testPoll' });
  testInvitation = await testPoll.generateInvite();
  testCandidate1 = await candidate.create({ name: 'testCandidate1', pollId: testPoll.id });
  testCandidate2 = await candidate.create({ name: 'testCandidate2', pollId: testPoll.id });
  // create users for authentication
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the app server routes', () => {
  test('Should return a poll on POST /poll', async () => {
    let response = await request.post('/api/v1/poll').send({
      name: 'test1And2-poll'
    });
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test1And2-poll');
  });

  // TODO: should be able to create candidates and votes with associated data values
  test('Should return a valid Poll and Candidates on GET /poll', async () => {
    let response = await request.get('/api/v1/poll');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(2);
    expect(response.body.records).toBeTruthy();
    expect(response.body.records[1].name).toEqual('test1And2-poll');
    expect(response.body.records[1].Candidates).toBeTruthy();
  });

  test('Should return a new Candidate with a valid Poll with POST /candidate', async () => {
    let response = await request.post('/api/v1/candidate').send({
      name: 'test3And4-candidate',
      pollId: testPoll.id
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('test3And4-candidate');
    expect(response.body.pollId).toEqual(testPoll.id);
  });

  test('Should create a Vote on POST /vote', async () => {
    let response = await request.post('/api/v1/vote')
      .set({ Authorization: `Bearer ${testInvitation}` })
      .send({ candidateId: testCandidate1.id });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.candidateId).toEqual(testCandidate1.id);
  });

  test('Should respond with 401 on POST /vote without a valid invite', async () => {
    let response = await request.post('/api/v1/vote')
      .set({ Authorization: `Bearer BadToken` })
      .send({ candidateId: testCandidate1.id });

    expect(response.status).toEqual(401);
    expect(response.body.message).toEqual('Router Error: unable to validate invitation');
  })

  test('Should be able to get a candidate and all votes on GET /candidates', async () => {
    let response = await request.get('/api/v1/candidate');

    expect(response.status).toBe(200);
    expect(response.body.count).toBeTruthy();
    expect(response.body.records).toBeTruthy();
    expect(response.body.records[0].Votes).toBeTruthy();
  });

  test('Should be able to get votes for candidate at GET /candidate/:id', async () => {
    let response = await request.get(`/api/v1/candidate/${testCandidate1.id}`);

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.records.name).toEqual(testCandidate1.name);
    expect(response.body.records.Votes).toBeTruthy();
    expect(response.body.records.Votes.length).toBeTruthy();
  })
});