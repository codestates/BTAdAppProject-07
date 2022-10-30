// @ts-nocheck
import type {NextPage} from 'next'
import Head from 'next/head'

import styles from '../styles/Home.module.css'
import {Box, Button, CircularProgress, Divider} from "@mui/material";
import CollectionList from "../components/collectionList";
import {useEffect, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {mintNFT} from "../utils/mintNFT";
import axios from "axios";
import {useRecoilState} from "recoil";
import {walletModalState} from "../states/recoilState";
import {useRouter} from "next/router";


const Home: NextPage = () => {
  const [openWalletModal, setOpenWalletModal] = useRecoilState(walletModalState)
  const {account, connected, signAndSubmitTransaction} = useWallet()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [mintCollection, setMintCollection] = useState({
    collectionName: '',
    creator: '',
    description: '',
  })

  useEffect(() => {
    if (!connected) {
      router.push('/')
    }
    getMintingInfo()
  }, [])

  const getMintingInfo = async () => {
    await axios.get(`http://localhost:8080/api/collection/market`)
      .then(result => {
        const {collection_title, user_address, collection_desc} = result.data.data

        if (collection_title && user_address) {
          setMintCollection({
            collectionName: collection_title,
            creator: user_address,
            description: collection_desc
          })
        }
      }).catch(e => {
        console.log('민팅용 nft가 존재하지 않습니다.')
        console.log(e)
      })
  }

  const handleClickMinting = async () => {
    console.log(connected)
    if (connected) {
      setLoading(true)
      mintNFT(account.address, mintCollection).then(payload => {
        console.log(payload)
        signAndSubmitTransaction(payload)
          .then((response) => {
            setLoading(false)
            console.log(response)
            router.push('/mypage')
          })
          .catch((e) => {
            console.log(e)
            setLoading(false)
          })
      })
    } else {
      setOpenWalletModal(true)
    }
  }

  return (
    <Box className={styles.container}>
      <Head>
        <title>무민샵</title>
        <meta name="description" content="여기는 무료로 드립니다. 무민샵"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <Box sx={{height: "300px", padding: "20px", backgroundColor: `#211e1e`, color: "#fff", position: 'relative', textAlign: 'center'}}>
          {
            mintCollection.collectionName &&
            <Box sx={{width: '90%', textAlign: 'left', margin: '0 auto'}}>
              <h2>오늘의 NFT를 받아보세요.</h2>
              <Button
                sx={{backgroundColor: '#fff', color: '#211e1e', borderRadius: "100px", fontSize: '16px', border: 'none'}}
                size="small"
                onClick={handleClickMinting}
                variant="contained"
              >
                claim NFT
                {
                  loading &&
                  <CircularProgress color="inherit" />
                }
              </Button>
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
