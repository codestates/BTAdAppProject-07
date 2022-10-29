'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'mint_nfts',
      'offer_address',
      {
        type: Sequelize.STRING,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'mint_nfts',
      'offer_address'
    );
  }
};
