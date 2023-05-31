'use strict';

const { sequelize, tables } = require('../../lib/models');
let { candidate, poll, vote } = tables;


beforeAll(async () => {
  await sequelize.sync();
})
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the candidates model', () => {
  test('Should create a Candidate record', async () => {
    let { id: testPollId } = await poll.create({ name: 'test1' });
    let record = await candidate.create({ name: 'test1', pollId: testPollId });

    expect(record.name).toEqual('test1');
    expect(record.id).toBeTruthy();
    expect(record.pollId).toEqual(testPollId);
  });

  test('Should read a Candidate record using findByPy', async () => {
    let { id: pollId } = await poll.create({ name: 'test2' });
    let record = await candidate.create({ name: 'test2', pollId });

    record = await candidate.findByPk(record.id);
    expect(record.name).toEqual('test2');
    expect(record.pollId).toEqual(pollId);
  });

  test('Should read Candidates using findAll', async () => {
    let { id: pollId } = await poll.create({ name: 'test3' });
    await candidate.create({name: 'test3', pollId });

    let records = await candidate.findAll({});
    expect(records.length > 0).toBeTruthy();
    records = records.filter(record => record.name === 'test3');
    expect(records[0].name).toEqual('test3');
    expect(records[0].pollId).toEqual(pollId);
  });

  test('Should be able to update a Candidate using update method', async () => {
    let { id: pollId } = await poll.create({ name: 'test4' });
    let { id } = await candidate.create({ name: 'test4', pollId });

    let record = await candidate.update({name: 'test4-update'}, { where: { id }, returning: true });
    expect(record).toBeTruthy();
  });

  test('Should return Candidates and associated Polls', async () => {
    let pollRecord = await poll.create({ name: 'test5' });
    let candidateRecord = await candidate.create({ name: 'test5', pollId: pollRecord.id });

    let search = await candidate.findOne({ where: { id: candidateRecord.id }, include: poll });
    expect(search.name).toEqual('test5');
    expect(search.Poll).toBeTruthy();
  });
  
  test('Should return a Candidate and all associated Votes', async () => {
    let pollRecord = await poll.create({ name: 'test6' });
    let candidateRecord = await candidate.create({ name: 'test6', pollId: pollRecord.id });

    await vote.create({ candidateId: candidateRecord.id });
    await vote.create({ candidateId: candidateRecord.id });
    await vote.create({ candidateId: candidateRecord.id });
    await vote.create({ candidateId: candidateRecord.id });
    await vote.create({ candidateId: candidateRecord.id });

    let search = await candidate.findOne({ where: { id: candidateRecord.id }, include: vote });
    expect(search.name).toEqual('test6');
    expect(search.Votes.length).toEqual(5);
  });
});