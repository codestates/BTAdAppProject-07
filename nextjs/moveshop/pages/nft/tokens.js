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

export default function MyToken() {
  return (
    <Container>
      <Container sx={{ m: "1rem" }}>
        <h2>My NFT 리스트</h2>
        <Stack spacing={1}>
          <Container>Hello List(준비중, 지갑에서 확인할것)</Container>
        </Stack>
      </Container>
    </Container>
  );
}
