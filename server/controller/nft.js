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

exports.getCollectionById = async (req, res, next) => {
  const id = req.params.id;
  const collection = await models.collection.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
  const nfts = await models.nft.findAll({
    where: {
      collection: {
        [Op.eq]: collection.collection_title,
      },
    },
  })
  res.status(200).json({ data: {
      collection: collection,
      nfts: nfts,
    }
  });
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

exports.getCollections = async (req, res, next) => {
  const collections = await models.collection.findAll({
    attributes: ['id', 'user_address', 'collection_title', 'collection_desc'],
  });
  res.status(200).json({ data: collections });
};

exports.getMintingCollection = async (req, res, next) => {
  const collection = await models.collection.findOne({
    where: {
      is_market_collection: {
        [Op.eq]: true,
      },
    },
    order: [
      ['createdAt', 'desc'],
    ],
    limit: 1
  });
  res.status(200).json({ data: collection });
}

exports.getMintNFT = async (req, res, next) => {
  const {collection_name} = req.query;
  const availableMintingNFT = await models.mint_nft.findOne({
    where: {
      occupied: {
        [Op.eq]: false,
      },
      offer_address: {
        [Op.is]: null
      },
      collection: {
        [Op.eq]: collection_name
      }
    },
    order: [
      ['id', 'asc'],
    ],
    limit: 1,
    attributes: ['id', 'collection', 'nft_name'],
  });
  return res.status(200).json({ data: availableMintingNFT });
}

exports.patchMintNFTToClaimToken = async (req, res, next) => {
  const id = req.params.id
  const updateMintNFT = await models.mint_nft.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  })
  updateMintNFT.occupied = true
  await updateMintNFT.save()
    .then((_) => {
      return res.status(200).json({ data: true })
    })
}

exports.patchMinNFTToOfferToken = async (req, res, next) => {
  const address =  req.body.user_address;
  const id = req.params.id
  const updateMintNFT = await models.mint_nft.findOne({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  })
  console.log(updateMintNFT)
  updateMintNFT.offer_address = address
  await updateMintNFT.save({fields:['offer_address']})
    .then((_) => {
      return res.status(200).json({ data: true })
    })
}
