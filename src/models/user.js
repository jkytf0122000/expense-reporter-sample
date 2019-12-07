'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING,
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};