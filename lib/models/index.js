'use strict';

require('dotenv').config();
const candidateModel = require('./candidates');
const pollModel = require('./polls');
const voteModel = require('./votes');
const { Sequelize, DataTypes } = require('sequelize');

const CONNECTION_STRING = process.env.DATABASE_URL || 'sqlite::memory:';

const sequelize = new Sequelize(CONNECTION_STRING);

const PollTable = pollModel(sequelize, DataTypes);
const CandidateTable = candidateModel(sequelize, DataTypes, PollTable);
const VoteTable = voteModel(sequelize, DataTypes, CandidateTable);

PollTable.Associations = [CandidateTable];
CandidateTable.Associations = [VoteTable];

PollTable.hasMany(CandidateTable, { foreignKey: 'pollId', sourceKey: 'id' });
CandidateTable.belongsTo(PollTable, { foreignKey: 'pollId', targetKey: 'id' });
CandidateTable.hasMany(VoteTable, { foreignKey: 'candidateId', sourceKey: 'id' });
VoteTable.belongsTo(CandidateTable, { foreignKey: 'candidateId', targetKey: 'id' });

module.exports = {
  poll: PollTable,
  candidate: CandidateTable,
  vote: VoteTable,
  sequelize
}