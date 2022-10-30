## Getting Started

패키지 설치
```bash
npm run install
# or
yarn install
```

프로젝트 실행
```bash
npm run dev
# or
yarn dev
```

http://localhost:3000 으로 작동 (기본 3000 port로 실행됌)

# env 설정
.env.example을 복사해서 환경설정을 해주세요.
NEXT_PUBLIC_MARKET_ADDRESS, NEXT_PUBLIC_WALLET_PRIVATE_KEY는 마켓용 지갑의 address와 private key를 적어주세요.
민팅 시 사용합니다.
```bash
NEXT_PUBLIC_NFT_STORAGE_KEY=
NEXT_PUBLIC_WALLET_PRIVATE_KEY=
NEXT_PUBLIC_MARKET_ADDRESS=
NEXT_PUBLIC_MARKET_NAME=mominshop
NEXT_PUBLIC_MARKET_COIN_TYPE=0x1::aptos_coin::AptosCoin
NEXT_PUBLIC_APTOS_NODE_URL=https://fullnode.devnet.aptoslabs.com
NEXT_PUBLIC_APTOS_FAUCET_URL=https://faucet.devnet.aptoslabs.com
NEXT_NODE_ENV=local
```

# 생성 페이지
- 홈페이지 : /
    - 현재 만들어진 collection 확인 가능
- 마이 페이지 : /mypage
    - 현재 소유중인 NFT 리스트 확인
    - 내가 만든 collection 목록 확인 가능
- collection 상 : /collection/{id}
  - collection 상세 확인 가능
  - collection에 속한 nft 목록 확인 가능
- NFT 생성 : /nft/token
    - NFT 생성 및 Collection 유무 확인
- Collection 생성 : /nft/collection
    - NFT가 포함된 Collection 생성
