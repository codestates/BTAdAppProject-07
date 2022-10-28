import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Wallet({ data }) {
  const [address, setAddress] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [apiResult, setApiResult] = useState(null);

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

  const callAPITest = async () => {
    try {
      const response = await axios.get("/api/hello");
      console.log(response.data);
      setApiResult(response.data.result);
    } catch (error) {}
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
      <Button variant="contained" onClick={callAPITest}>
        API TEST
      </Button>
      <div>api response: {apiResult}</div>

      <hr />
      <div>{data.result}</div>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/hello`);
  const data = await res.json();
  console.log(data);
  return { props: { data } };
}
