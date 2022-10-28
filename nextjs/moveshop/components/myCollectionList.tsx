import {Box, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import axios from "axios";
import CollectionItem from "./collectionItem";
import {MaybeHexString} from "@martiandao/aptos-web3-bip44.js";

interface CollectionListProps {
  address?: MaybeHexString;
}
const MyCollectionList: NextPage<CollectionListProps> = (props) => {
  const [collections, setCollectedCollections] = useState([])
  const {address} = props

  useEffect(() => {
    getResources()
  }, [])

  const getResources = async () => {
    const result = await axios.get(`http://localhost:8080/api/collection?user_address=${address}`)
    console.log(result)
    setCollectedCollections(result.data.data)
  }

  return (
    <>
      <Box>
        <Stack direction={{xs: 'column', sm: 'row'}} sx={{flexWrap: 'wrap', justifyContent: 'center'}}
               spacing={{xs: 1, sm: 2, md: 4}}>
          {
            collections.length === 0 ?
              <Box sx={{margin: '10rem auto'}}>
                collection이 존재하지 않습니다.
              </Box>
              :
              collections.map((item,i) =>
                <CollectionItem
                  key={i}
                  id={item.id}
                  collection_title={item.collection_title}
                  collection_desc={item.collection_desc}
                  creator={item.creator}
                />
              )
          }

        </Stack>
      </Box>
    </>
  )
}

export default MyCollectionList
