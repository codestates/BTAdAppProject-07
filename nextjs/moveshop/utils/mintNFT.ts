import {AptosAccount, AptosClient, HexString, TokenClient} from "aptos";
import {NODE_URL} from "./common";
import axios from "axios";

export const mintNFT = async (address, collection) => {
  // 현재 발급 중인 collection 정보 가져오기
  if (!collection.collectionName) return false

  const client = new AptosClient(NODE_URL)
  const tokeClient = new TokenClient(client)
  const hex = new HexString(process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY)
  const marketAccount = new AptosAccount(hex.toUint8Array())

  try {
    const result = await axios.get(`http://localhost:8080/api/mint?collection_name=${collection.collectionName}`)

    if (!result.data.data){
      alert('발급 처리할 nft가 존재하지 않습니다.')
      throw '발급 처리할 nft가 존재하지 않습니다.'
    }

    const {id, nft_name} = result.data.data
    console.log('발급 처리 정보', result.data.data)

    const offerTxHash = await tokeClient.offerToken(
      marketAccount,
      address,
      marketAccount.address().toString(),
      collection.collectionName,
      nft_name,
      1,
      0)

    const transactionResult = await client.waitForTransactionWithResult(offerTxHash)
    console.log('transaction 처리 완료', transactionResult)
    console.log('offer transaction hash', offerTxHash)

    const pathResult= await axios.patch(`http://localhost:8080/api/mint/${id}/offer`, {
      user_address: address
    })

    console.log(pathResult)

    const payload = {
      type: "entry_function_payload",
      function: "0x3::token_transfers::claim_script",
      type_arguments: [],
      arguments: [
        marketAccount.address().toString(),
        marketAccount.address().toString(),
        collection.collectionName,
        nft_name,
        0
      ]
    }
    console.log(payload)
    return payload
  } catch (e) {
    console.log(e)
    throw 'offer 실패'
  }
}
