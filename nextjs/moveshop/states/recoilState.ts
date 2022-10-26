import {atom} from 'recoil'

export const PublicKeyState = atom({
  key: 'publicKey',
  default: ''
})

export const AddressState = atom({
  key: 'address',
  default: ''
})

