import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {MaybeHexString, WalletClient} from "@martiandao/aptos-web3-bip44.js";
import {FAUCET_URL, NODE_URL} from "../utils/common";
import ItemList from "./itemList";
import {NextPage} from "next";

interface CollectedItemsProps {
  address?: MaybeHexString
}


const CollectedItems: NextPage<CollectedItemsProps> = (props) => {
  const {address} = props
  const [collectedCollections, setCollectedCollections] = useState([])

  useEffect(() => {
    getResources().then(r =>  console.log(r)).catch(e => console.log(e))
  }, [address])

  const getResources = async () => {
    if (address !== null ) {
      const walletClient = new WalletClient(NODE_URL, FAUCET_URL)
      const collections = await walletClient.getTokens(address)
      const getCollectionItems = collections.reduce( (myCollections, myCollection) => {
        const {collection, uri, name, description} = myCollection.token
        myCollections.push({
          collection_title: collection,
          image: uri,
          name: name,
          description: description
        })
        return myCollections
      }, [])
      setCollectedCollections(getCollectionItems)
    }
  }

  return (
    <>
      <Box>
        <ItemList list={collectedCollections}/>
      </Box>
    </>
  )
}

export default CollectedItems
