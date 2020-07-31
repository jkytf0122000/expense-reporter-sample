"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: "811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA",
        email: "test@example.com",
        first_name: "sample",
        last_name: "test",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "326260F7-2516-4C17-B8D1-DE50EF42C440",
        email: "deleted@example.com",
        first_name: "deleted",
        last_name: "deleted",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", {
      id: [
        "811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA",
        "326260F7-2516-4C17-B8D1-DE50EF42C440",
      ],
    });
  },
};
