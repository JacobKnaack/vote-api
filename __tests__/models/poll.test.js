'use strict';

const { sequelize, tables } = require('../../lib/models');
let { poll, candidate } = tables;

beforeAll(async () => {
  try {
    await sequelize.sync();
  } catch(e) {
    console.log(e);
  }
})
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the Polls model', () => {
  test('Should create a Poll record, and generate valid invitations', async () => {
    let pollRecord = await poll.create({ name: 'test' });
    let invite = pollRecord.generateInvite();

    expect(pollRecord.name).toEqual('test');
    expect(pollRecord.id).toBeTruthy();
    expect(invite).toBeTruthy();
    expect(poll.validateInvite(invite).poll).toEqual('test');
  });

  test('Should create a Poll and with an associated Candidate', async () => {
    let pollRecord = await poll.create({ name: 'test2' });
    let association = await candidate.create({ name: 'test2', pollId: pollRecord.id });

    let search = await poll.findOne({ where: { id: pollRecord.id }, include: candidate });
    expect(search.name).toEqual('test2');
    expect(search.Candidates).toBeTruthy();
    expect(search.Candidates[0].id).toEqual(association.id);
  })
});
