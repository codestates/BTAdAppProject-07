const express = require("express");
const router = express.Router();

const nftController = require("../controller/nft");

router.get("/nft", nftController.getNFT);
router.get("/nfts", nftController.getNFTs);
router.post("/nft", nftController.postNFT);

router.get("/collection", nftController.getCollection);
router.get("/collection/market", nftController.getMintingCollection)
router.get("/collection/:id", nftController.getCollectionById);
router.post("/collection", nftController.postCollection);

router.get("/collections", nftController.getCollections);

// 민팅 관련
router.get("/mint", nftController.getMintNFT)
router.patch("/mint/:id/occupied", nftController.patchMintNFTToClaimToken)
router.patch("/mint/:id/offer", nftController.patchMinNFTToOfferToken)

module.exports = router;
