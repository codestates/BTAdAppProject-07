import {Stack} from "@mui/material";
import {NextPage} from "next";
import React from "react";
import Item from "./item";
import {ItemListProps} from "../interface/props/itemListProps";

const ItemList: NextPage<ItemListProps> = (props) => {
  return (
    <Stack direction={{xs: 'column', sm: 'row'}}
           spacing={{xs: 1, sm: 2, md: 4}}>
      <Item key={1} value={1} title={"안녕"}/>
      <Item key={1} value={1} title={"안녕"}/>
      <Item key={1} value={1} title={"안녕"}/>
      <Item key={1} value={1} title={"안녕"}/>
      <Item key={1} value={1} title={"안녕"}/>
    </Stack>
  )
}

export default ItemList
