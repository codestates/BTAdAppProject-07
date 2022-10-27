import axios from "axios";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {Box} from "@mui/material";
import {useEffect} from "react";

export default function CollectedItems() {
  const {account} = useWallet()

  useEffect(() => {
    getResources()
  }, [])

  const getResources = async () => {
    console.log(account)
    const result = await axios.get("http://localhost:8080/api/nft/collected", {
      user_address: account?.address,
    });
    console.log(result)
  }

  return (
    <>
      <Box>
        collected
      </Box>
    </>
  )
}
