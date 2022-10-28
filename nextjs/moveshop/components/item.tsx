import {Card, CardContent, CardMedia} from "@mui/material";
import {NextPage} from "next";
import React from "react";
import {ItemProps} from "../interface/props/itemProps";

const Item: NextPage<ItemProps> = (props) => {
  const {collection_title, image, name, description} = props;

  return (
    <Card sx={{maxWidth: '15rem'}}>
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
  )
}

export default Item
