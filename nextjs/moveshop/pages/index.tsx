import type {NextPage} from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import {Box, Button, Divider} from "@mui/material";
import CollectionList from "../components/collectionList";
import {useEffect, useState} from "react";
import {getRandomColor} from "../utils/common";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {mintNFT} from "../utils/mintNFT";
import axios from "axios";
import {useRecoilState} from "recoil";
import {walletModalState} from "../states/recoilState";

const Home: NextPage = () => {
  const [openWalletModal, setOpenWalletModal] = useRecoilState(walletModalState)
  const {account, connected, signAndSubmitTransaction} = useWallet()
  const [bgColor, setBGColor] = useState('')
  const [mintCollection, setMintCollection] = useState({
    collectionName: '',
    creator: '',
    description: '',
  })

  useEffect(() => {
    getMintingInfo()
    setBGColor(getRandomColor())
  }, [])

  const getMintingInfo = async () => {
    const result = await axios.get(`http://localhost:8080/api/collection/market`)
    const {collection_title, user_address, collection_desc} = result.data.data

    if (collection_title && user_address) {
      setMintCollection({
        collectionName: collection_title,
        creator: user_address,
        description: collection_desc
      })
    }
  }

  const handleClickMinting = async () => {
    if (connected) {
      mintNFT(account.address, mintCollection).then(payload => {

      })
    } else {
      setOpenWalletModal(true)
    }
  }

  return (
    <Box className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Box sx={{height: "300px", padding: "20px", backgroundColor: `${bgColor}`, color: "#fff", position: 'relative'}}>
          {
            mintCollection.collectionName &&
            <Box>
              <Button variant={'contained'} onClick={handleClickMinting}>민팅</Button>
            </Box>
          }
        </Box>
        <Box sx={{
          width: '100%',
          height: 10,
        }}></Box>

        <Box sx={{ width : '90%', margin: '0 auto'}}>
          <h4>New collections</h4>
          <Divider variant="middle"/>
          <CollectionList/>
        </Box>
      </main>
    </Box>
  )
}

export default Home
