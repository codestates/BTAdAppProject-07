import {Box, Card, CardContent, CardMedia} from "@mui/material";
import {NextPage} from "next";
import React from "react";
import {ItemProps} from "../interface/props/itemProps";
import {useRecoilState} from "recoil";
import {sellNFTModalState, tokenIdState} from "../states/recoilState";

const Item: NextPage<ItemProps> = (props) => {
  const {collection_title, image, name, description, tokenId, isMine} = props;
  const [selectedTokenId, setTokenId] = useRecoilState(tokenIdState)
  const [openSellNFTModal, setOpenSellNFTModal] = useRecoilState(sellNFTModalState)

  const handleClickCard = () => {
    setTokenId(tokenId)
    if (isMine) {
      setOpenSellNFTModal(true)
    }
  }

  return (
    <Box>
      <Card sx={{maxWidth: '15rem', margin: '20px !important'}} onClick={handleClickCard}>
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="NFT 이미지"
        />
        <CardContent>
          <div> {collection_title}</div>
          <div>{name}</div>
          <div>{description}</div>
        </CardContent>
      </Card>
    </Box>

  )
}

export default Item
