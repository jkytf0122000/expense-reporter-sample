'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('expenses',
      'user_id', {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeCulumn('expenses',
      user_id);
  }
};
