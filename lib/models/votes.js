'use strict';

const voteModel = (sequelize, DataTypes, CandidateTable) => {
  const model = sequelize.define('Votes', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    candidateId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CandidateTable,
        key: 'id'
      }
    },
  });

  return model;
}

module.exports = voteModel;