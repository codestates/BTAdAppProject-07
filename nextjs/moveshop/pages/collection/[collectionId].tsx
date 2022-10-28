import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Box, IconButton, Stack} from "@mui/material";
import {getRandomColor, NODE_URL} from "../../utils/common";
import axios from "axios";
import {AptosClient, TokenClient} from "@martiandao/aptos-web3-bip44.js";
import LinkIcon from '@mui/icons-material/Link';
import NFTItem from "../../components/NFTItem";

const CollectionDetail = (props) => {
  const router = useRouter();
  const {collectionId} = props
  const [collection, setCollection] = useState({
    collection_title: '',
    description: '',
    uri: '',
    supply: 0,
  })
  const [collectedCollections, setCollectedCollections] = useState([])
  const [bgColor, setBGColor] = useState('')

  useEffect(() => {
    getResource()
    setBGColor(getRandomColor())
  }, [])

  const getResource = async () => {
    const client = new AptosClient(NODE_URL)
    const tokenClient = new TokenClient(client);
    const result = await axios.get(`http://localhost:8080/api/collection/${collectionId}`)
    const {nfts, collection} = result.data.data
    const { user_address, collection_title} = collection
    const collectionInfo = await tokenClient.getCollectionData(user_address, collection_title)
    setCollection({
      collection_title: collectionInfo.name,
      description: collectionInfo.description,
      uri: collectionInfo.uri,
      supply: collectionInfo.supply
    })

    Promise.all(nfts.map( async nft => {
      const tokendata = await tokenClient.getTokenData(user_address, collection_title, nft.nft_name)
      console.log(tokendata)
      const {uri, name, description} = tokendata
      return {
        collection: nft.collection,
        name: name,
        image: uri,
        description: description,
        isMine: false
      }
    })).then(collectedNFTs => {
      setCollectedCollections(collectedNFTs)
    })
  }

  return (
    <>
      <Box sx={{height: "300px", padding: "20px", backgroundColor: `${bgColor}`, color: "#fff", position: 'relative'}}>
        <Box sx={{fontSize: "28px"}}>
          {collection?.collection_title}
          <IconButton aria-label="delete" disabled color="primary" onClick={() => window.open(collection?.uri)}>
            <LinkIcon />
          </IconButton>
        </Box>
        <Box sx={{marginTop: '10px'}}>{collection?.description}</Box>
        <Box sx={{position: 'absolute', right : '20px', bottom: '20px'}}>{`총 발급량 ${collection.supply}`}</Box>
      </Box>
      <Box sx={{padding: "20px"}}>
        <Stack direction={{xs: 'column', sm: 'row'}} sx={{flexWrap: 'wrap', justifyContent: 'center'}}
               spacing={{xs: 1, sm: 2, md: 4}}>
          {
            collectedCollections.map((item, i) =>
              <NFTItem
                key={i}
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

      </Box>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const {collectionId} = context.query
  return { props: context.query }
}

export default CollectionDetail
