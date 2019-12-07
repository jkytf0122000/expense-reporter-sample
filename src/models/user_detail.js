'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_detail = sequelize.define('user_detail', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    underscored: true,
  });
  user_detail.associate = function(models) {
    // associations can be defined here
  };
  return user_detail;
};