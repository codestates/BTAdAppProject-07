'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nfts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_address: {
        type: Sequelize.STRING
      },
      collection: {
        type: Sequelize.STRING
      },
      nft_name: {
        type: Sequelize.STRING
      },
      supply: {
        type: Sequelize.INTEGER
      },
      nft_desc: {
        type: Sequelize.STRING
      },
      img_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('nfts');
  }
};