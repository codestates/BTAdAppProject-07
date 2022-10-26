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

export default function NFT() {
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

  const [tokenname, setTokenname] = useState(null);
  const [collection, setCollection] = useState(null);
  const [tokendesc, setTokendesc] = useState(null);
  const [supply, setSupply] = useState(1);

  const [nfturl, setNfturl] = useState(null);
  const [imageError, setImageError] = useState(true);
  const [account, setAccount] = useState(null);

  const tokenPropertyVersion = 0;
  const clients = {};
  const accounts = {};
  const connectClient = async () => {
    // Create API and faucet clients.
    const client = new AptosClient(NODE_URL);
    clients.client = client;
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
    clients.faucetClient = faucetClient;
    // Create client for working with the token module.
    const tokenClient = new TokenClient(client);
    clients.tokenClient = tokenClient;
    // Create a coin client for checking account balances.
    const coinClient = new CoinClient(client);
    clients.coinClient = coinClient;
    console.log(clients);
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
    const txnHash2 = await clients.tokenClient.createToken(
      account,
      collection,
      tokenname,
      tokendesc,
      parseInt(supply),
      nfturl
    );
    await clients.client.waitForTransaction(txnHash2, { checkSuccess: true });
    await getCollectionData();
  };

  const getCollectionData = async () => {
    // Print the collection data.
    const collectionData = await clients.tokenClient.getCollectionData(
      accounts.alice.address(),
      collectionName
    );
    console.log(`collection: ${JSON.stringify(collectionData, null, 4)}`);

    // Get the token balance.
    const tokenBalance = await clients.tokenClient.getToken(
      address,
      collectionName,
      tokenName,
      tokenPropertyVersion
    );
    console.log(`token balance: ${tokenBalance["amount"]}`);

    // Get the token data.
    const tokenData = await clients.tokenClient.getTokenData(
      address,
      collectionName,
      tokenName
    );
    console.log(`token data: ${JSON.stringify(tokenData, null, 4)}`);
  };

  const getBalances = async () => {
    // Print their balances.
    const tokenBalance = await tokenClient.getToken(
      address,
      collectionName,
      tokenName,
      tokenPropertyVersion
    );
    const bobBalance2 = await tokenClient.getTokenForAccount(
      bob.address(),
      tokenId
    );
    console.log(`token balance: ${tokenBalance["amount"]}`);
  };

  const transferToken = async () => {
    let txnHash5 = await tokenClient.directTransferToken(
      fromAccount,
      toAccount,
      toAddress,
      collectionName,
      tokenName,
      1,
      tokenPropertyVersion
    );
    await client.waitForTransaction(txnHash5, { checkSuccess: true });
  };

  useEffect(() => {
    connectClient();
  }, []);

  return (
    <Container>
      <Container sx={{ m: "1rem" }}>
        <h2>NFT 생성</h2>
        <Stack spacing={1}>
          <label>Address</label>
          <Container>
            <p>{address}</p>
          </Container>
          <label>Public Key</label>
          <Container>
            <p>{publicKey}</p>
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
