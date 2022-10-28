import {atom, selector} from 'recoil'

export const getWalletModalState = selector({
  key: "getWalletModalSelector",
  get: ({get}) => {
    return get(walletModalState)
  },
});

export const walletModalState = atom({
  key: 'walletModalState',
  default: false
})

export const sellNFTModalState = atom({
  key: 'sellNFTModalState',
  default: false
})

export const tokenIdState = atom({
  key: 'tokenIdState',
  default: {}
})
