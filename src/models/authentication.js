'use strict';
module.exports = (sequelize, DataTypes) => {
  const authentication = sequelize.define('authentication', {
    name: DataTypes.STRING,
    hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    underscored: true,
  });
  authentication.associate = function(models) {
    // associations can be defined here
  };
  return authentication;
};