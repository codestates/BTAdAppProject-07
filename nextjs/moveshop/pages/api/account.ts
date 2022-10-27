import {FAUCET_URL, NODE_URL} from "../../utils/common";
import {AptosClient, FaucetClient, TokenClient} from "@martiandao/aptos-web3-bip44.js";

export default function () {
  const client = new AptosClient(NODE_URL);
  const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);
  const tokenClient = new TokenClient(client);
}
