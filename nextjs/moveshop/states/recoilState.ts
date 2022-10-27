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


