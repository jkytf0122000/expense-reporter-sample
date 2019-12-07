'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};