import {atom, selector} from 'recoil'

export const publicKeyState = atom({
  key: 'publicKeyState',
  default: ''
})

export const getPubicKeySelector = selector({
  key: "getPubicKeySelector",
  get: ({get}) => {
    return get(publicKeyState)
  },
});

export const addressState = atom({
  key: 'addressState',
  default: ''
})

export const getAddressSelector = selector({
  key: "getAddressSelector",
  get: ({get}) => {
    return get(addressState)
  },
});


