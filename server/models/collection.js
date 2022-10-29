'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  collection.init({
    user_address: DataTypes.STRING,
    collection_title: DataTypes.STRING,
    collection_desc: DataTypes.STRING,
    is_market_collection: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'collection',
  });
  return collection;
};
