import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {AptosClient, CoinClient, TokenClient,} from "aptos";
import {useEffect, useState} from "react";
import {Button, Container, Stack, TextField,} from "@mui/material";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Token() {
  const router = useRouter();
  const { wallets, connect, account, disconnect } = useWallet();

  const [myAddress, setMyAddress] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);

  const [tokenname, setTokenname] = useState(null);
  const [collection, setCollection] = useState(null);
  const [tokendesc, setTokendesc] = useState(null);
  const [supply, setSupply] = useState(1);

  const [nfturl, setNfturl] = useState(null);
  const [imageError, setImageError] = useState(true);

  const [collectionMsg, setCollectionMsg] = useState(null);
  const [collectionExist, setCollectionExist] = useState(true);

  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");

  const tokenPropertyVersion = 0;
  const clients = {};
  // const collections = [];

  const connectClient = async () => {
    const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
    clients.client = new AptosClient(NODE_URL);
    clients.tokenClient = new TokenClient(clients.client);
    clients.coinClient = new CoinClient(clients.client);
    console.log(clients);
  };

  const connectMartian = async () => {
    await connectClient();
    if (!("martian" in window)) {
      alert("martian 지갑을 설치해 주세요");
      return window.martian;
    }

    const result = await window.martian.connect();
    setMyAddress(result.address);
    setMyPublicKey(result.publicKey);
    console.log(result);
    // await getCollectionsByAddress();
  };

  const createToken = async () => {
    // Create a token in that collection.

    console.log(collection, tokenname, tokendesc, parseInt(supply), nfturl);
    try {
      const txnHash = await window.martian.createToken(
        collection,
        tokenname,
        tokendesc,
        parseInt(supply),
        nfturl
      );

      const result = await axios.post("http://localhost:8080/api/nft", {
        user_address: myAddress,
        collection: collection,
        nft_name: tokenname,
        supply: parseInt(supply),
        nft_desc: tokendesc,
        img_url: nfturl,
      });
      router.push("/nft/tokens");
    } catch (err) {
      console.log(err);
    }
  };

  const getCollectionData = async () => {
    await connectClient();
    console.log(clients);
    try {
      const collectionData = await clients.tokenClient.getCollectionData(
        myAddress,
        collection
      );
      console.log(collectionData);
      setCollectionMsg("Collection 이 있습니다. 계속 진행하세요");
      setCollectionExist(true);
    } catch (err) {
      console.log(err);
      setCollectionMsg("Collection 없습니다. 생성 후 진행하세요");
      setCollectionExist(false);
    }
  };

  const getCollectionsByAddress = async () => {
    const url = `http://localhost:8080/api/collection?user_address=${myAddress}`;
    console.log(url);
    const result = await axios.get(url);
    console.log(collections.data);
    collections = result.data;
    console.log(result.data);
    setCollections(result.data);
  };

  useEffect(() => {
    // connectClient();
    connectMartian();
  }, []);

  return (
    <Container>
      <Container sx={{ m: "1rem" }}>
        <h2>NFT 생성</h2>
        <Stack spacing={1}>
          <label>Address</label>
          <Container>
            <div>{myAddress}</div>
          </Container>
          <label>Public Key</label>
          <Container>
            <div>{myPublicKey}</div>
          </Container>
          {/* <TextField
            id="select-collection"
            select
            label="Select"
            value={selectedCollection}
            onChange={(e) => {
              setSelectedCollection(e.target.value);
            }}
            helperText="Please select your currency"
          >
            {collections &
              collections.map((collection) => (
                <MenuItem
                  key={collection.collection_title}
                  value={collection.collection_title}
                >
                  {collection.collection_title}
                </MenuItem>
              ))}
          </TextField> */}
          <label>Collection Name</label>
          <TextField
            required
            id="outlined-required"
            label="collection"
            name="collection"
            onChange={(e) => {
              setCollection(e.target.value);
            }}
          />
          <label>{collectionMsg}</label>
          {collectionExist ? null : (
            <Link href="/nft/collection">
              <Button variant="contained" color="success">
                Creaet Collection
              </Button>
            </Link>
          )}
          <Button variant="contained" onClick={getCollectionData}>
            Collection 확인 (없으면 생성해야 합니다)
          </Button>

          <label>NFT Token Name</label>
          <TextField
            required
            id="outlined-required"
            label="Token Name"
            name="tokenname"
            onChange={(e) => {
              setTokenname(e.target.value);
            }}
          />
          <label>Number of Token</label>
          <TextField
            required
            id="outlined-required"
            label="supply"
            type="number"
            defaultValue="1"
            onChange={(e) => {
              setSupply(e.target.value);
            }}
          />
          <label>Token Description</label>
          <TextField
            required
            id="outlined-required"
            label="description"
            name="description"
            onChange={(e) => {
              setTokendesc(e.target.value);
            }}
          />
          <label>NFT Token Image Url</label>

          <TextField
            required
            id="outlined-required"
            label="url"
            name="url"
            onChange={(e) => {
              setNfturl(e.target.value);
              setImageError(false);
            }}
          />
          <Container sx={{ width: 200 }}>
            <div>NFT preview</div>
            <img
              width="500"
              src={imageError ? "/image/initImg.svg" : nfturl}
              alt="nft-image"
              onError={(e) => {
                setImageError(true);
              }}
              data-src={nfturl}
            />
          </Container>
          <Button variant="contained" onClick={createToken}>
            Create Token
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}
