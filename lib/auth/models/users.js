'use strict';

const bcrypt = require('bcrypt');
const API_SECRET = process.env.API_SECRET || 'CHANGE_ME';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull:  false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {},
      set() {},
    }
  });

  model.beforeCreate = async function() {
    this.password = await bcrypt.hash(this.password, )
  }

  model.authenticateBasic = function(username, password) {

  }

  model.authenticateBearer = function(token) {
    
  }

  return model;
}

module.exports = userModel;