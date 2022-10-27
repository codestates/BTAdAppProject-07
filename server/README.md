## How start

- npm install
- npm start
  - localhost:8080/account/account

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

### API

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

```
POST /api/collection
json 형식으로 보낼것
{
    "user_address":"hellosdfh2342l",
    "collection_title":"test collection name",
    "collection_desc":"colelction description"
}
```