'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_master = sequelize.define('user_master', {
    deleted_at: DataTypes.DATE
  }, {
    underscored: true,
  });
  user_master.associate = function(models) {
    // associations can be defined here
  };
  return user_master;
};