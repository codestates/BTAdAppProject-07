const express = require("express");
const router = express.Router();

const nftController = require("../controller/nft");

router.get("/nft", nftController.getNFT);
router.post("/nft", nftController.postNFT);

router.post("/nft/collected", nftController.getCollectedCollections);

router.get("/collection", nftController.getCollection);
router.post("/collection", nftController.postCollection);

module.exports = router;
