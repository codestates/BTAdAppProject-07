"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  nft.init(
    {
      user_address: DataTypes.STRING,
      collection: DataTypes.STRING,
      nft_name: DataTypes.STRING,
      supply: DataTypes.INTEGER,
      nft_desc: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "nft",
    }
  );
  return nft;
};
