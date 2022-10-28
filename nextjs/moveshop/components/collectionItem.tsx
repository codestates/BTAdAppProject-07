import {Box, Card, CardContent} from "@mui/material";
import {NextPage} from "next";
import {MaybeHexString} from "@martiandao/aptos-web3-bip44.js";
import React from "react";

export interface CollectionItemProps {
  collection_title: string;
  collection_desc: string;
  creator: MaybeHexString
}

const CollectionItem: NextPage<CollectionItemProps> = (props) => {
  const {collection_title, collection_desc, creator} = props;

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  return (
    <Card sx={{width: '200px', margin: '20px !important'}}>
      <Box sx={{height: "150px", width : "200px", backgroundColor: `${getRandomColor()}`}}></Box>
      <CardContent>
        <Box sx={{fontSize:"18px"}}> {collection_title}</Box>
        <Box sx={{fontSize:"12px"}}>{collection_desc}</Box>
      </CardContent>
    </Card>
  )
}

export default CollectionItem
