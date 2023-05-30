'use strict';

const jwt = require('jsonwebtoken');
const SECRET = process.env.INVITATION_SECRET || 'PLEASE_ADD_A_SECRET';

const pollModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Polls', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Math.floor(Date.now() / 1000) + (60 * 60),
      validate: {
        isTimestamp(value) {
          if (!(new Date(value)).getTime() > 0) {
            throw new Error('Invalid timestamp for \'expiresAt\' field');
          }
        }
      }
    }
  });

  model.validateInvite = function (invite) {
    return jwt.verify(invite, SECRET);
  }

  model.prototype.generateInvite = function() {
    return jwt.sign({ exp: this.expiresAt, poll: this.name}, SECRET);
  }

  return model;
}

module.exports = pollModel;
