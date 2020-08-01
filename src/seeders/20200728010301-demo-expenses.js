"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("expenses", [
      {
        id: 1,
        user_name: "sample test",
        user_id: "811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA",
        date: "2020-08-01 15:45:00+09",
        type: "交通費",
        description: "池袋/東京",
        amount: 500,
        approval: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        user_name: "deleted deleted",
        user_id: "326260F7-2516-4C17-B8D1-DE50EF42C440",
        date: "2020-08-05 10:45:00+09",
        type: "宿泊費",
        description: "グランドホテル東京",
        amount: 12000,
        approval: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        user_name: "sample test",
        user_id: "811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA",
        date: "2020-07-31 10:45:00+09",
        type: "交通費",
        description: "横浜/東京",
        amount: 700,
        approval: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        user_name: "employee 001",
        user_id: "4DE423B0-8180-404A-9E60-12A768CD98AF",
        date: "2020-07-25 12:00:00+09",
        type: "宿泊費",
        description: "サンシャインホテル",
        amount: 9000,
        approval: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        user_name: "employee 001",
        user_id: "4DE423B0-8180-404A-9E60-12A768CD98AF",
        date: "2020-07-28 09:15:00+09",
        type: "交通費",
        description: "東京/神田",
        amount: 130,
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
