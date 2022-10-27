import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import axios from "axios";
import nacl from "tweetnacl";
import {
  AptosClient,
  AptosAccount,
  FaucetClient,
  TokenClient,
  CoinClient,
  AptosAccountObject,
} from "aptos";

export default function Test({ data }) {
  const [address, setAddress] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [wallet, setWallet] = useState(null);

  const getAptosWallet = () => {
    if ("aptos" in window) {
      return window.aptos;
    } else {
      window.open("https://petra.app/", `_blank`);
    }
  };

  const connectWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();
      setAddress(response.address);
      setPublicKey(response.publicKey);
      console.log(response); // { address: string, publicKey: string }
      setWallet(wallet);
    } catch (error) {
      // { code: 4001, message: "User rejected the request."}
    }
    const account = await window.aptos.account();
    console.log("window aptos account");
    console.log(account);
  };

  const disconnectWallet = async () => {
    try {
      const wallet = getAptosWallet();
      await wallet.disconnect();
      setAddress(null);
      setPublicKey(null);
    } catch (err) {
      console.log(err);
    }
  };

  const callTransaction = async () => {
    console.log(wallet);
    const address =
      "0xb24fcb7736a66f83aa2291b847be2797786153e20561bd92559343456addd113";
    const transaction = {
      // address, amount
      arguments: [address, "50000000"],
      function: "0x1::coin::transfer",
      type: "entry_function_payload",
      type_arguments: ["0x1::aptos_coin::AptosCoin"],
    };
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(
        transaction
      );
      const client = new AptosClient("https://testnet.aptoslabs.com");
      const txn = await client.waitForTransactionWithResult(
        pendingTransaction.hash
      );
      console.log(txn);
    } catch (error) {
      console.log("transaction failed");
      console.log(error);
    }
  };

  const makeToken = async () => {
    const address =
      "0xb24fcb7736a66f83aa2291b847be2797786153e20561bd92559343456addd113";
    const transaction = {
      // address, amount
      arguments: [address, "50000000"],
      function: "0x3::token::transfer",
      type: "entry_function_payload",
      type_arguments: ["0x3::aptos_coin::AptosCoin"],
    };
    try {
      const pendingTransaction = await window.aptos.signAndSubmitTransaction(
        transaction
      );
      const client = new AptosClient("https://testnet.aptoslabs.com");
      const txn = await client.waitForTransactionWithResult(
        pendingTransaction.hash
      );
      console.log(txn);
    } catch (error) {
      console.log("transaction failed");
      console.log(error);
    }
  };

  const callMessage = async () => {
    const message = "hello";
    const nonce = "random_string";

    try {
      const response = await window.aptos.signMessage({
        message,
        nonce,
      });
      const { publicKey } = await window.aptos.account();
      // Remove the 0x prefix
      const key = publicKey.slice(2, 66);
      const verified = nacl.sign.detached.verify(
        Buffer.from(response.fullMessage),
        Buffer.from(response.signature, "hex"),
        Buffer.from(key, "hex")
      );
      console.log(verified);
    } catch (error) {
      console.error(error);
    }
  };

  const testAptosAccount = async () => {
    const aptosAccountObject = {
      address:
        "0x978c213990c4833df71548df7ce49d54c759d6b6d932de22b24d56060b7af2aa",
      privateKeyHex:
        // eslint-disable-next-line max-len
        "0xc5338cd251c22daa8c9c9cc94f498cc8a5c7e1d2e75287a5dda91096fe64efa5de19e5d1880cac87d57484ce9ed2e84cf0f9599f12e7cc3a52e4e7657a763f2c",
      publicKeyHex:
        "0xde19e5d1880cac87d57484ce9ed2e84cf0f9599f12e7cc3a52e4e7657a763f2c",
    };
    const account = AptosAccount.fromAptosAccountObject(aptosAccountObject);
    console.log(account);
    console.log(`Balance : ${await coinClient.checkBalance(account)}`);
  };

  useEffect(() => {
    // connectWallet();
  }, []);

  return (
    <Container>
      <Button variant="contained" onClick={connectWallet}>
        Connect Wallet
      </Button>
      <div>Address: {address}</div>
      <div>publicKey: {publicKey}</div>
      <Button variant="contained" onClick={disconnectWallet}>
        Disconnect Wallet
      </Button>
      <hr />
      <Button variant="contained" onClick={callTransaction}>
        Transaction Test
      </Button>
      <hr />
      <Button variant="contained" onClick={makeToken}>
        make Token
      </Button>
      <hr />
      <Button variant="contained" onClick={callMessage}>
        Message Test
      </Button>
      <Button variant="contained" onClick={testAptosAccount}>
        Test Account
      </Button>
    </Container>
  );
}
