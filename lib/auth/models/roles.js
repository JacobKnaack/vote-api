'use strict';

const rolesModel = (sequelize, DataTypes) => {
  const model = sequelize.define('Roles', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User',
      allowNull: false
    }
  });

  return model;
}

module.exports = rolesModel