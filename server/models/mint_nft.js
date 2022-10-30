'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mint_nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mint_nft.init({
    collection: DataTypes.STRING,
    nft_name: DataTypes.STRING,
    occupied: DataTypes.BOOLEAN,
    img_url: DataTypes.STRING,
    offer_address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'mint_nft',
  });
  return mint_nft;
};
