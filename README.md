# BTAdAppProject-07

# 프로젝트 소개

- 프로젝트명
  - 무민샵
- 프로젝트 목적
  - NFT 생성 및 전시 Dapp
- 사용한 블록체인
  - Aptos (APT)
- 앱토스 소개
  - 최고의 보안과 신뢰를 제공하는 가장 확장 가능한 블록체인을 목표로 하는 레이버 1 블록체인
  - Move 라는 프로그래밍 언어를 사용하여 개발되었음
- 참고 레퍼런스
  - https://github.com/aptos-labs
  - https://aptos.dev/
  - https://docs.martianwallet.xyz/docs/

# 프로젝트 구조

- 프론트엔드 : nextjs
  - 사용 라이브러리 : aptos, react, martian wallet, mui
- 백엔드 : server
  - node.js (express)
  - DB : MySQL 8.x (Docker)
  - sequelize

# 프로젝트 소개 페이지

- https://www.notion.so/codestates/7-9b40aef23d25488fbcb92741f3b9128c
- https://github.com/codestates/BTAdAppProject-07/

# 사용법

- nextjs (프론트엔드) 실행

```
cd nextjs/moveshop
npm install
npm run dev
```

- server (백엔드) 실행

```
cd server
npm install
docker docker-compose up
config/config.json (설정에서 포트 확인 할 것)
npm install sequelize-cli -g
sequelize db:create
sequelize db:migrate
npm start
```

# 페이지 URL 소개

- 홈페이지 : /
  - 해당 서비스에서 사용자들이 생성한 모든 Collection 조회
  - Collection 별 NFT 조회
- 마이 페이지 : /mypage
  - 지갑 연결 사용자가 생성한 Collection 조회
  - 현재 소유중인 NFT 리스트 조회
- Collection 생성 : /nft/collection
  - NFT를 포함시킬 Collection 생성
- NFT 생성 : /nft/token
  - NFT 생성 및 Collection 유무 확인

# API List

- 모든 NFT 조회
  - GET /api/nft
- 사용자 address 기준 NFT 조회
  - GET /api/nfts?user_address={user_address}
- NFT 생성
  - POST /api/nft
- 사용자 address 기준 Collection 조회
  - GET /api/collection?user_address={user_address}
- Collection 생성
  - POST /api/collection
