import {Box, Card, CardContent} from "@mui/material";
import {NextPage} from "next";
import {MaybeHexString} from "@martiandao/aptos-web3-bip44.js";
import React from "react";
import {getRandomColor} from "../utils/common";
import {useRouter} from "next/router";

export interface CollectionItemProps {
  id: number;
  collection_title: string;
  collection_desc: string;
  creator: MaybeHexString
}

const CollectionItem: NextPage<CollectionItemProps> = (props) => {
  const {id, collection_title, collection_desc, creator} = props;
  const router = useRouter();

  const handleClickCollection = () => {
    router.push(`/collection/${id}`)
  }

  return (
    <Card sx={{width: '200px', margin: '20px !important'}} onClick={handleClickCollection}>
      <Box sx={{height: "150px", width : "200px", backgroundColor: `${getRandomColor()}`}}></Box>
      <CardContent>
        <Box sx={{fontSize:"18px"}}> {collection_title}</Box>
        <Box sx={{fontSize:"12px"}}>{collection_desc}</Box>
      </CardContent>
    </Card>
  )
}

export default CollectionItem
