const express = require("express");
const router = express.Router();

const nftController = require("../controller/nft");

router.get("/nft", nftController.getNFT);
router.get("/nfts", nftController.getNFTs);
router.post("/nft", nftController.postNFT);

router.get("/collection", nftController.getCollection);
router.get("/collection/:id", nftController.getCollectionById);
router.post("/collection", nftController.postCollection);

router.get("/collections", nftController.getCollections);

module.exports = router;
