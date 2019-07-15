'use strict';
module.exports = (sequelize, DataTypes) => {
  const expense = sequelize.define('expense', {
    user_name: DataTypes.STRING,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    description: DataTypes.TEXT,
    amount: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  expense.associate = function(models) {
    // associations can be defined here
  };
  return expense;
};