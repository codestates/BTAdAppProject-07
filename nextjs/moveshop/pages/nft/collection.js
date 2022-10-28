import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptosClient, CoinClient, TokenClient,} from "aptos";
import {useEffect, useState} from "react";
import {Button, Container, Stack, TextField,} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";

export default function Token() {
  const router = useRouter();
  const { wallets, connect, account, disconnect } = useWallet();
  const [myAddress, setMyAddress] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);
  const [collection, setCollection] = useState(null);
  const [collectionDesc, setCollectionDesc] = useState(null);
  const [collectionUrl, setCollectionUrl] = useState(null);
  const clients = {};

  const connectClient = async () => {
    const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
    clients.client = new AptosClient(NODE_URL);
    clients.tokenClient = new TokenClient(clients.client);
    clients.coinClient = new CoinClient(clients.client);
    console.log(clients);
  };

  const connectMartian = async () => {
    // await connectClient();
    if (!("martian" in window)) {
      alert("martian 지갑을 설치해 주세요");
      return window.martian;
    }

    const result = await window.martian.connect();
    setMyAddress(result.address);
    setMyPublicKey(result.publicKey);
    console.log(result);
  };

  const createCollection = async () => {
    try {
      // Create a collection
      const txnHash = await window.martian.createCollection(
        collection,
        collectionDesc,
        collectionUrl
      );
      const result = await axios.post("http://localhost:8080/api/collection", {
        user_address: myAddress,
        collection_title: collection,
        collection_desc: collectionDesc,
      });
      router.push("/nft/tokens");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectMartian();
  }, []);

  return (
    <Container>
      <Container sx={{ m: "1rem" }}>
        <h2>Collection 생성</h2>
        <Stack spacing={1}>
          <label>Address</label>
          <Container>
            <div>{myAddress}</div>
          </Container>
          <label>Public Key</label>
          <Container>
            <div>{myPublicKey}</div>
          </Container>
          <label>Collection Title</label>
          <TextField
            required
            id="outlined-required"
            label="collection"
            name="collection"
            onChange={(e) => {
              setCollection(e.target.value);
            }}
          />

          <label>Collection Description</label>
          <TextField
            required
            id="outlined-required"
            label="collectionDesc"
            name="collectionDesc"
            onChange={(e) => {
              setCollectionDesc(e.target.value);
            }}
          />

          <label>Collection Url</label>

          <TextField
            required
            id="outlined-required"
            label="collectionUrl"
            name="collectionUrl"
            onChange={(e) => {
              setCollectionUrl(e.target.value);
            }}
          />
          <Button variant="contained" onClick={createCollection}>
            Create Collection
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}
