'use strict';

const candidatesModel = (sequelize, DataTypes, PollTable) => {
  return sequelize.define('Candidates', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pollId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: PollTable,
        key: 'id'
      }
    }
  });
}

module.exports = candidatesModel;