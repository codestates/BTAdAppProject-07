## Getting Started

패키지 설치
```bash
npm run install
# or
yarn install
```

프로젝트 실행
```bash
npm run start
# or
yarn start
```

# env 설정
.env.example을 복사해서 환경설정을 해주세요.
MARKET_PRIVATE_KEY, MARKET_ADDRESS 마켓용 지갑의 address와 private key를 적어주세요.
민팅 시 사용합니다.
```bash
MARKET_PRIVATE_KEY=
MARKET_ADDRESS=
MARKET_NAME=mominshop
MARKET_URL=http://localhost:3000
APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com
APTOS_FAUCET_URL=https://faucet.devnet.aptoslabs.com
```


### sequelize

- config/config.json 폴더에 접속관련 설정이 있음
- npm install sequelize-cli -g
- sequelize db:create
- mysql 에 dev-moveshop db생성됨
- 아래의 명령어를 통해 nft 모델을 생성
- sequelize model:generate --name nft --attributes user_address:string,collection:string,nft_name:string,supply:integer,nft_desc:string,img_url:string
- collection 모델 생성
- sequelize model:generate --name collection --attributes user_address:string,collection_title:string,collection_desc:string
- sequelize db:migrate
- dev-moveshop db에 nft, collection 테이블 생성됨

## collection 생성 
실행 시 민팅용 nft 생성, 하루 한 번 생성 가능
```bash
npm create-collection
# or
yarn create-collection
```


## API List

모든 NFT 조회

```
GET /api/nft
response
{
    "data": [
        {
            "id": 1,
            "user_address": "test",
            "collection": "test collection",
            "nft_name": "nft_name",
            "supply": 1,
            "nft_desc": "nft_desc",
            "img_url": "https://image.jpg",
            "createdAt": "2022-10-27T11:33:08.000Z",
            "updatedAt": "2022-10-27T11:33:08.000Z"
        }
    ]
}
```

사용자 address 기준 NFT 조회

```
GET /api/nfts?user_address={user_address}
response
{
    "data": [
        {
            "id": 4,
            "user_address": "0x37451e367e2222b10876b21b2da345794f74b31036bae6da0c27641de6b0dd5",
            "collection": "My Collection 01",
            "nft_name": "Token NFT 002",
            "supply": 2,
            "nft_desc": "Token Desc 002",
            "img_url": "https://cdn.pixabay.com/photo/2022/08/31/09/06/pumpkin-7422802_1280.jpg",
            "createdAt": "2022-10-27T12:11:37.000Z",
            "updatedAt": "2022-10-27T12:11:37.000Z"
        }
    ]
}
```

NFT 생성

```
POST /api/nft
json 형식으로 보낼것
{
    "user_address":"test address",
    "collection":"123",
    "nft_name":"nft 123",
    "supply": 2,
    "nft_desc": "nft is good",
    "img_url": "http://image.png"
}
```

사용자 address 기준 Collection 조회

```
GET /api/collection?user_address=******
response
{
    "data": [
        {
            "id": 1,
            "user_address": "hellosdfh2342l",
            "collection_title": "test collection name",
            "collection_desc": "colelction description",
            "createdAt": "2022-10-27T11:54:37.000Z",
            "updatedAt": "2022-10-27T11:54:37.000Z"
        }
    ]
}
```

생성된 Collection 하나 가져오기

```
GET /api/collection/1
response
{
    "data": [
        {
            "id": 1,
            "user_address": "hellosdfh2342l",
            "collection_title": "test collection name",
            "collection_desc": "colelction description",
            "createdAt": "2022-10-27T11:54:37.000Z",
            "updatedAt": "2022-10-27T11:54:37.000Z"
        }
    ]
}
```

Collection 생성

```
POST /api/collection
json 형식으로 보낼것
{
    "user_address":"hellosdfh2342l",
    "collection_title":"test collection name",
    "collection_desc":"colelction description"
}
```

전체 Collections 조회

```
POST /api/collections
json 형식으로 보낼것
{
    "id": 1,
    "user_address":"hellosdfh2342l",
    "collection_title":"test collection name",
    "collection_desc":"colelction description"
}
```

민팅 가능한 nft 가져오기
```
GET /api/mint
{
    "id": 1,
    "collection":"test collection name",
    "nft_name":"colelction description"
}
```

claim 완료 처리
```
PATCH /api/mint/:id/occupied
```

offer address 남기기
```
PATCH /api/mint/:id/offer
```
