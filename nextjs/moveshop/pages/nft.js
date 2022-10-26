import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
} from "aptos";
import { NODE_URL, FAUCET_URL } from "../utils/common";
import { useEffect, useState } from "react";
import { Button, Container } from "@mui/material";

export default function NFT() {
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
  const createAccount = async () => {
    // Create accounts.
    const alice = new AptosAccount();
    const bob = new AptosAccount();
    accounts.alice = alice;
    accounts.bob = bob;
    // Print out account addresses.
    console.log("=== Addresses ===");
    console.log(`Alice: ${alice.address()}`);
    console.log(`Bob: ${bob.address()}`);
    console.log("");
  };

  const fundAccount = async () => {
    // Fund accounts.
    await clients.faucetClient.fundAccount(
      accounts.alice.address(),
      100_000_000
    );
    await clients.faucetClient.fundAccount(accounts.bob.address(), 100_000_000);

    console.log("=== Initial Coin Balances ===");
    console.log(
      `Alice: ${await clients.coinClient.checkBalance(accounts.alice)}`
    );
    console.log(`Bob: ${await clients.coinClient.checkBalance(accounts.bob)}`);
    console.log("");
  };

  const createCollection = async (
    collectionName,
    tokenName,
    tokenPropertyVersion
  ) => {
    console.log("=== Creating Collection and Token ===");

    const tokenId = {
      token_data_id: {
        creator: accounts.alice.address().hex(),
        collection: collectionName,
        name: tokenName,
      },
      property_version: `${tokenPropertyVersion}`,
    };

    // Create the collection.
    // creator must create a collection to store tokens(NFT??).
    // 토큰은 NFT, 컬렉션은 계정마다 토큰이 모인 컬렉션북 느낌.
    const txnHash1 = await clients.tokenClient.createCollection(
      accounts.alice,
      collectionName,
      "Alice's simple collection",
      "https://alice.com"
    );
    await clients.client.waitForTransaction(txnHash1, { checkSuccess: true });
  };

  const createToken = async (
    collectionName,
    tokenName,
    tokenDescription,
    supply,
    uri
  ) => {
    // Create a token in that collection.
    const txnHash2 = await clients.tokenClient.createToken(
      accounts.alice,
      collectionName,
      tokenName,
      tokenDescription,
      1,
      uri
    );
    await clients.client.waitForTransaction(txnHash2, { checkSuccess: true });
  };

  const getCollectionData = async (
    collectionName,
    tokenName,
    tokenPropertyVersion
  ) => {
    // Print the collection data.
    const collectionData = await clients.tokenClient.getCollectionData(
      accounts.alice.address(),
      collectionName
    );
    console.log(
      `Alice's collection: ${JSON.stringify(collectionData, null, 4)}`
    );

    // Get the token balance.
    const aliceBalance1 = await clients.tokenClient.getToken(
      accounts.alice.address(),
      collectionName,
      tokenName,
      tokenPropertyVersion
    );
    console.log(`Alice's token balance: ${aliceBalance1["amount"]}`); // <:!:section_7

    // Get the token data.
    const tokenData = await clients.tokenClient.getTokenData(
      accounts.alice.address(),
      collectionName,
      tokenName
    );
    console.log(`Alice's token data: ${JSON.stringify(tokenData, null, 4)}`); // <:!:section_8
  };

  const transferToken = async () => {
    // Alice offers one token to Bob.
    console.log("\n=== Transferring the token to Bob ===");
    // :!:>section_9
    const txnHash3 = await tokenClient.offerToken(
      alice,
      bob.address(),
      alice.address(),
      collectionName,
      tokenName,
      1,
      tokenPropertyVersion
    ); // <:!:section_9
    await clients.client.waitForTransaction(txnHash3, { checkSuccess: true });
  };

  const claimToken = async () => {
    // Bob claims the token Alice offered him.
    // :!:>section_10
    const txnHash4 = await tokenClient.claimToken(
      bob,
      alice.address(),
      alice.address(),
      collectionName,
      tokenName,
      tokenPropertyVersion
    ); // <:!:section_10
    await client.waitForTransaction(txnHash4, { checkSuccess: true });
  };

  const getBalances = async () => {
    // Print their balances.
    const aliceBalance2 = await tokenClient.getToken(
      alice.address(),
      collectionName,
      tokenName,
      `${tokenPropertyVersion}`
    );
    const bobBalance2 = await tokenClient.getTokenForAccount(
      bob.address(),
      tokenId
    );
    console.log(`Alice's token balance: ${aliceBalance2["amount"]}`);
    console.log(`Bob's token balance: ${bobBalance2["amount"]}`);

    console.log(
      "\n=== Transferring the token back to Alice using MultiAgent ==="
    );

    let txnHash5 = await tokenClient.directTransferToken(
      bob,
      alice,
      alice.address(),
      collectionName,
      tokenName,
      1,
      tokenPropertyVersion
    );
    await client.waitForTransaction(txnHash5, { checkSuccess: true });
  };

  const printBalances = async () => {
    // Print out their balances one last time.
    const aliceBalance3 = await tokenClient.getToken(
      alice.address(),
      collectionName,
      tokenName,
      `${tokenPropertyVersion}`
    );
    const bobBalance3 = await tokenClient.getTokenForAccount(
      bob.address(),
      tokenId
    );
    console.log(`Alice's token balance: ${aliceBalance3["amount"]}`);
    console.log(`Bob's token balance: ${bobBalance3["amount"]}`);
  };

  useEffect(() => {
    // connectClient();
  }, []);

  return (
    <Container>
      <Button variant="contained" onClick={connectClient}>
        connect Client
      </Button>
      <hr />
      <Button variant="contained" onClick={createAccount}>
        create Account
      </Button>
      <hr />
      <Button variant="contained" onClick={fundAccount}>
        fund Account
      </Button>
      <hr />
      <Button
        variant="contained"
        onClick={(e) => {
          createCollection("Alice collection", "Alice's first token", 0);
        }}
      >
        create Collection
      </Button>
      <hr />
      <Button
        variant="contained"
        onClick={(e) => {
          createToken(
            "Alice collection",
            "Alice NFT 001",
            "Alice ToKen Description",
            1,
            "https://aptos.dev/img/nyan.jpeg"
          );
        }}
      >
        create Token
      </Button>
      <hr />
      <Button
        variant="contained"
        onClick={(e) => {
          getCollectionData("Alice collection", "Alice NFT 001", 0);
        }}
      >
        get Collection Data
      </Button>
    </Container>
  );
}
