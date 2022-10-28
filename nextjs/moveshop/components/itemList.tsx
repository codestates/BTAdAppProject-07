import {Box, CircularProgress, Stack} from "@mui/material";
import {NextPage} from "next";
import React from "react";
import Item from "./item";
import {ItemListProps} from "../interface/props/itemListProps";

const ItemList: NextPage<ItemListProps> = (props) => {
  const {list} = props
  console.log('list' + list.length)
  console.log(list)

  return (
    <Stack direction={{xs: 'column', sm: 'row'}}
           spacing={{xs: 1, sm: 2, md: 4}}>
      {
        list.length === 0 ?
        <Box sx={{margin: '0 auto'}}>
          <CircularProgress/>
        </Box>
          :
          list.map(item =>
            <Item
              collection_title={item.collection_title}
              image={item.image}
              name={item.name}
              description={item.description}
            />
          )
      }

    </Stack>
  )
}

export default ItemList
