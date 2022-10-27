const models = require("../models");
const { Op } = require("sequelize");

exports.getNFT = async (req, res, next) => {
  const nfts = await models.nft.findAll();
  res.status(200).json({ data: nfts });
};

exports.getNFTs = async (req, res, next) => {
  const address = req.query.user_address;
  console.log(address);
  const nfts = await models.nft.findAll({
    where: {
      user_address: {
        [Op.eq]: address,
      },
    },
  });
  res.status(200).json({ data: nfts });
};

exports.postNFT = async (req, res, next) => {
  const { user_address, collection, nft_name, supply, nft_desc, img_url } =
    req.body;
  console.log(req.body);
  models.nft
    .create({
      user_address: user_address,
      collection: collection,
      nft_name: nft_name,
      supply: supply,
      nft_desc: nft_desc,
      img_url: img_url,
    })
    .then((_) => {
      res.status(200).json({ result: "nft created" });
    });
};

exports.getCollection = async (req, res, next) => {
  const address = req.query.user_address;
  console.log(address);
  const collection = await models.collection.findAll({
    where: {
      user_address: {
        [Op.eq]: address,
      },
    },
  });
  res.status(200).json({ data: collection });
};

exports.postCollection = async (req, res, next) => {
  const { user_address, collection_title, collection_desc } = req.body;
  models.collection
    .create({
      user_address: user_address,
      collection_title: collection_title,
      collection_desc: collection_desc,
    })
    .then((_) => {
      res.status(200).json({ result: "collection created" });
    });
};
