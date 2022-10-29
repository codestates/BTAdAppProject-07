import {AptosAccount, AptosClient, HexString, TokenClient} from "aptos";
import {getRandomSVG, NODE_URL} from "./common";
import axios from "axios";

export const mintNFT = async (address, collection) => {
  // 현재 발급 중인 collection 정보 가져오기
  if (!collection.collectionName) return false

  const client = new AptosClient(NODE_URL)
  const tokeClient = new TokenClient(client)
  const hex = new HexString(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY)
  const marketAccount = new AptosAccount(hex.toUint8Array())

  const collectionData = await tokeClient.getCollectionData(marketAccount.address(), collection.collectionName)
  const {supply} = collectionData
  const nextTokenNumber = Number(supply) + 1

  const tokenName = `${collection.collectionName} #${new Date().getTime()}`
  const uri = getRandomSVG()

  const token = await tokeClient.createToken(
    marketAccount,
    collection.collectionName,
    tokenName,
    collection.description,
    1,
    uri
  )
  console.log(token)

  const result = await axios.post("http://localhost:8080/api/nft", {
    user_address: marketAccount.address().toString(),
    collection: collection.collectionName,
    nft_name: tokenName,
    supply: 1,
    nft_desc:  collection.description,
    img_url: uri,
  });

  const offerTxHash = await tokeClient.offerToken(
    marketAccount,
    address,
    marketAccount.address().toString(),
    collection.collectionName,
    tokenName,
    1,
    0)
  console.log(offerTxHash)

  // payload
  return {
    type: "entry_function_payload",
    function: "0x3::token_transfers::claim_script",
    type_arguments: [],
    arguments: [
      marketAccount.address().toString(),
      collection.creator,
      collection.collectionName,
      tokenName,
      0
    ]
  }
}
