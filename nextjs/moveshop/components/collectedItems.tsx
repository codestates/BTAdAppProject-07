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
    getResources()
  }, [address])

  const getResources = async () => {
    if (address !== null ) {
      const walletClient = new WalletClient(NODE_URL, FAUCET_URL)
      const tokens = await walletClient.getTokenIds(address)

      Promise.all(tokens.tokenIds.map(async (token) => {
        const myNft = await walletClient.getToken(token.data)
        const {collection, uri, name, description} = myNft
        return {
          collection: collection,
          name: name,
          image: uri,
          description: description,
          tokenId: token.data,
          isMine: true
        }
      })).then(collectedNFTs => {
        setCollectedCollections(collectedNFTs)
      })
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
