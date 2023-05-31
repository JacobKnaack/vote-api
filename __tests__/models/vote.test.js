'use strict';

const { sequelize, tables } = require('../../lib/models');
const { poll, candidate, vote  } = tables;

beforeAll(async () => {
  await sequelize.sync();
})
afterAll(async () => {
  await sequelize.drop();
});

describe('testing the vote model', () => {
  test('Should create a new vote record', async () => {
    let { id: pollId } = await poll.create({ name: 'test1' });
    let { id: candidateId } = await candidate.create({ name: 'test1', pollId });
  
    const record = await vote.create({ candidateId });
    expect(record.id).toBeTruthy();
    expect(record.candidateId).toEqual(candidateId);
  });

  test('Should return all Votes with an associated Candidate', async () => {
    let { id: pollId } = await poll.create({ name: 'test2' });
    let { id: candidateId } = await candidate.create({ name: 'test2', pollId });

    await vote.create({ candidateId });
    await vote.create({ candidateId });
    await vote.create({ candidateId });
    await vote.create({ candidateId });

    let records = await vote.findAll({ where: { candidateId }, include: candidate });
    expect(records.length).toEqual(4);
    expect(records[0].Candidate.name).toEqual('test2');
  });
})