"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("expenses", [
      {
        id: 1,
        user_name: "sample user",
        date: "2020-08-01 15:45:00+09",
        type: "交通費",
        description: "池袋/東京",
        amount: 500,
        approval: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("expenses", {});
  },
};
