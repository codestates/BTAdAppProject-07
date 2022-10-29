import { useWallet } from "@manahippo/aptos-wallet-adapter";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import nacl from "tweetnacl";
import { AptosAccount, AptosClient } from "aptos";
import { MaybeHexString, WalletClient } from "@martiandao/aptos-web3-bip44.js";
import { FAUCET_URL, NODE_URL } from "../utils/common";

export default function Test({ data }) {
  const { wallets, connect, account, disconnect, signAndSubmitTransaction } =
    useWallet();
  const [address, setAddress] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [wallet, setWallet] = useState(null);

  const getAptosWallet = () => {
    if ("martian" in window) {
      return window.martian;
    }
    window.open("https://www.martianwallet.xyz/", "_blank");
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

  const sendToken = async () => {
    // Create a transaction
    const response = await window.martian.connect();
    const sender = response.address;
    const payload = {
      function: "0x3::token::get_collection_uri",
      type_arguments: ["0x3::token::Collections"],
      arguments: [
        "0x037451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5",
        "My Collection 01",
      ],
    };
    // 0x037451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5;
    const transaction = await window.martian.generateTransaction(
      sender,
      payload
    );
    const txnHash = await window.martian.signAndSubmitTransaction(transaction);
  };

  // 참고 문서
  // https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/framework/aptos-token/doc

  const token_offer = async () => {
    const payload = {
      type: "entry_function_payload",
      function: "0x3::token_transfers::offer_script",
      type_arguments: [],
      arguments: [
        "0x589882ca3299af9ba76065c8aa8244c6a24f0e9d76eff306899b4c5cc2425398",
        address,
        "My Collection 01",
        "Token NFT 002",
        0,
        1,
      ],
    };
    signAndSubmitTransaction(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const cancel_offer = async () => {
    const payload = {
      type: "entry_function_payload",
      function: "0x3::token_transfers::cancel_offer_script",
      type_arguments: [],
      arguments: [
        "0x037451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5",
        address,
        "My Collection 01",
        "Token NFT 001",
        0,
      ],
    };
    signAndSubmitTransaction(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
  };

  const claim_offer = async () => {
    const payload = {
      type: "entry_function_payload",
      function: "0x3::token_transfers::claim_script",
      type_arguments: [],
      arguments: [
        "0x037451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5",
        "0x037451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5",
        "My Collection 01",
        "Token NFT 001",
        0,
      ],
    };
    signAndSubmitTransaction(payload)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
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
        <hr />
        Disconnect Wallet
      </Button>
      <hr />
      <Button variant="contained" onClick={token_offer}>
        Token offer
      </Button>
      <hr />
      <Button variant="contained" onClick={cancel_offer}>
        Token Offer Cancel
      </Button>
      <hr />
      <Button variant="contained" onClick={claim_offer}>
        Token Claim
      </Button>
    </Container>
  );
}
