const models = require("./models");
const {AptosAccount, HexString, TokenClient, AptosClient, CoinClient, FaucetClient} = require("aptos");
const {response} = require("express");
require('dotenv').config();

const aptosFaucetURL = process.env.APTOS_FAUCET_URL
const aptosNodeURL = process.env.APTOS_NODE_URL

// 마켓 정보 불러오기
const marketAddress = process.env.MARKET_ADDRESS
const privateKey = process.env.MARKET_PRIVATE_KEY

if (!marketAddress || !privateKey) {
  throw 'env 파일을 설정해주세요!!!'
}

const marketURL = process.env.MARKET_URL
const hex = new HexString(privateKey)
const marketAccount = new AptosAccount(hex.toUint8Array(), null)

const client = new AptosClient(aptosNodeURL)
const tokeClient = new TokenClient(client)
const coinClient = new CoinClient(client)
const faucetClient = new FaucetClient(aptosNodeURL, aptosFaucetURL)

const getRandomSVG = () => {
  const baseURL = 'https://source.boringavatars.com'
  const type = ['marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']
  const shape = ['', 'square']
  const selectType = type[Math.floor(Math.random() * 5)]
  const shapeType = shape[Math.floor(Math.random() * 1)]
  return `${baseURL}/${selectType}/40/${new Date().getTime()}?${shapeType}`
}

const createCollection = async (_) => {
  try {
    console.log('오늘의 collection 처리 진행')
    console.log('market balance 체크')
    const balance = await coinClient.checkBalance(marketAccount)
    console.log('market balance', balance)
    // balance가 없으면 airdrop 요청
    if (balance <= 200000000n) {
      await faucetClient.fundAccount(marketAccount.address(), 100000000)
      console.log('market account에 token faucet완료')
    }
    console.log('market balance 체크 완료')

    const today = new Date()
    const nextYear = today.getFullYear() + 1
    const targetDate = new Date(`${nextYear}-01-01T00:00:00+0900`)
    const distance = targetDate.getTime() - today.getTime()
    const day = Math.floor(distance/(1000*60*60*24));
    const collectionName = `오늘의 NFT, ${nextYear}년까지 D-${day}일!!`
    const collectionDescription = `오늘은 ${nextYear}년까지 D-${day}일 남았습니다. 올해를 잘 끝내봐요!`

    // 생성할 nft 수
    const totalSupply = 10

    const alreadyCreateCollection = await tokeClient.getCollectionData(marketAddress, collectionName)
      .then(response => {
        console.log('이미 오늘의 collection 생성이 완료되었습니다.', response)
        return true
      }).catch(e => false)

    if (!alreadyCreateCollection) {
      const txHash = await tokeClient.createCollection(
        marketAccount,
        collectionName,
        collectionDescription,
        marketURL,
        totalSupply
      )
      const result = await client.waitForTransactionWithResult(txHash)
      console.log('transaction 처리 완료', result)
      models.collection
        .create({
          user_address: marketAddress,
          collection_title: collectionName,
          collection_desc: collectionDescription,
          is_market_collection: true,
        })
        .then((_) => {
          console.log('collection 로컬 저장 완료')
        });

      for(let i = 1; i <= totalSupply; i++){
        const imageURL = getRandomSVG()
        const nftName = `${collectionName} #${i}`
        console.log(nftName)
        let txHash = await tokeClient.createToken(
          marketAccount,
          collectionName,
          nftName,
          collectionDescription,
          1,
          imageURL
        )

        await client.waitForTransaction(txHash).then(response => {
          console.log(response)
          models.mint_nft
            .create({
              collection: collectionName,
              nft_name: nftName,
              occupied: false,
              img_url: imageURL
            })
            .then((_) => {
              console.log(`${i} 번째 저장1`)
            });
          models.nft
            .create({
              collection: collectionName,
              nft_name: nftName,
              supply: 1,
              nft_desc: collectionDescription,
              img_url: imageURL,
            })
            .then((_) => {
              console.log(`${i} 번째 저장2`)
            });
        })
      }
    }
  } catch (e) {
    console.error(e)
  }
}

createCollection()
  .then((_) => console.log('collection 생성 처리 완료'))
  .catch(e => {
    console.error(e)
    console.log('collection 생성 처리 종료')
  })







