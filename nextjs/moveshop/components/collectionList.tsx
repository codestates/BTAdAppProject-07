import {Box, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {NextPage} from "next";
import axios from "axios";
import CollectionItem from "./collectionItem";

const CollectionList: NextPage = () => {
  const [collections, setCollectedCollections] = useState([])

  useEffect(() => {
    getResources()
  }, [])

  const getResources = async () => {
    const result = await axios.get("http://localhost:8080/api/collections")
    setCollectedCollections(result.data.data)
  }

  return (
    <>
      <Box>
        <Stack direction={{xs: 'column', sm: 'row'}} sx={{flexWrap: 'wrap', justifyContent: 'center'}}
               spacing={{xs: 1, sm: 2, md: 4}}>
          {
            collections.length === 0 ?
              <Box>
                NFT가 존재하지 않습니다.
              </Box>
              :
              collections.map(item =>
                <CollectionItem
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

export default CollectionList
