"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("roles", [
      {
        id: 1,
        user_id: "C042C74D-9D99-4C99-838D-1299252F3761",
        name: "B",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        user_id: "782580E8-2936-4D3B-9497-BA6545BC387C",
        name: "BA",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", {});
  },
};
