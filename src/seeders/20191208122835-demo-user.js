"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        id: "811FCB5D-7128-4AA6-BFEE-F1A8D3302CDA",
        boss_id: "C042C74D-9D99-4C99-838D-1299252F3761",
        email: "test@example.com",
        first_name: "sample",
        last_name: "test",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "4DE423B0-8180-404A-9E60-12A768CD98AF",
        boss_id: "C042C74D-9D99-4C99-838D-1299252F3761",
        email: "employee_001@example.com",
        first_name: "employee",
        last_name: "001",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "3CCEBCA4-3910-41A9-8810-5A8C4E3AD25D",
        boss_id: "C042C74D-9D99-4C99-838D-1299252F3761",
        email: "employee_002@example.com",
        first_name: "employee",
        last_name: "002",
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
      {
        id: "C042C74D-9D99-4C99-838D-1299252F3761",
        email: "boss@example.com",
        first_name: "boss",
        last_name: "test",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "782580E8-2936-4D3B-9497-BA6545BC387C",
        email: "accounting@example.com",
        first_name: "accounting",
        last_name: "test",
        hash: "$2b$10$IPwsYH8cAD9IarEGhj1/Vua2Lz4y/FD7GubAB.dNgfxgqx6i5heyy",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", {});
  },
};
