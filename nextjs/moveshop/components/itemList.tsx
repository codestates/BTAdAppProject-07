import {Box, CircularProgress, Stack} from "@mui/material";
import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import Item from "./item";
import {ItemListProps} from "../interface/props/itemListProps";

const ItemList: NextPage<ItemListProps> = (props) => {
  const {list} = props
  const total = list.length || 0
  const itemPerRow = 5

  return (
    <Stack direction={{xs: 'column', sm: 'row'}} sx={{flexWrap: 'wrap', justifyContent: 'center'}}
           spacing={{xs: 1, sm: 2, md: 4}}>
      {
        list.length === 0 ?
          <Box>
              보유한 NFT가 없습니다.
          </Box>
          :
          list.map(item =>
            <Item
              collection_title={item.collection_title}
              image={item.image}
              name={item.name}
              description={item.description}
              tokenId={item.tokenId}
              isMine={item.isMine}
            />
          )
      }

    </Stack>
  )
}

export default ItemList
