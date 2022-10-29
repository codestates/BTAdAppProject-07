'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'collections',
      'is_market_collection',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'collections',
      'is_market_collection'
    );
  }
};
