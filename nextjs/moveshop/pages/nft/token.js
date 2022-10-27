import { atom, initialState, useRecoilState } from "recoil";
import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
} from "aptos";
import { NODE_URL, FAUCET_URL } from "../../utils/common";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  Grid,
  Stack,
  Blocks,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";

export default function Token() {
  const router = useRouter();
  const PublicKeyState = atom({
    key: "publicKey",
    default: null,
  });
  const AddressState = atom({
    key: "address",
    default: null,
  });
  const [publicKey, setPublicKeyState] = useRecoilState(PublicKeyState);
  const [address, setAddressState] = useRecoilState(AddressState);

  const [myAddress, setMyAddress] = useState(null);
  const [myPublicKey, setMyPublicKey] = useState(null);

  const [tokenname, setTokenname] = useState(null);
  const [collection, setCollection] = useState(null);
  const [tokendesc, setTokendesc] = useState(null);
  const [supply, setSupply] = useState(1);

  const [nfturl, setNfturl] = useState(null);
  const [imageError, setImageError] = useState(true);
  const [account, setAccount] = useState(null);

  const [collectionMsg, setCollectionMsg] = useState(null);

  const tokenPropertyVersion = 0;
  const clients = {};
  const accounts = {};
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
    // window.open("https://www.martianwallet.xyz/", "_blank");
    const result = await window.martian.connect();
    setMyAddress(result.address);
    setMyPublicKey(result.publicKey);
    console.log(result);
  };

  const getAccount = async () => {
    // const account = new AptosAccount();
    // setAccount(account)
  };

  const createToken = async () => {
    // Create a token in that collection.

    console.log(
      account,
      collection,
      tokenname,
      tokendesc,
      parseInt(supply),
      nfturl
    );
    try {
      const txnHash = await window.martian.createToken(
        collection,
        tokenname,
        tokendesc,
        parseInt(supply),
        nfturl
      );
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
    } catch (err) {
      console.log(err);
      setCollectionMsg("Collection 없습니다. 생성 후 진행하세요");
    }
  };

  useEffect(() => {
    // connectClient();
  }, []);

  return (
    <Container>
      <Container sx={{ m: "1rem" }}>
        <h2>NFT 생성</h2>
        <Stack spacing={1}>
          <Button variant="contained" onClick={connectMartian}>
            Martian Wallet 연결
          </Button>
          <label>Address</label>
          <Container>
            <p>{myAddress}</p>
          </Container>
          <label>Public Key</label>
          <Container>
            <p>{myPublicKey}</p>
          </Container>
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
            <p>NFT preview</p>
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
