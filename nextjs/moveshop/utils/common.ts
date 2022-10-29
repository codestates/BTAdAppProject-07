export const NODE_URL =
  process.env.APTOS_NODE_URL || "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL =
  process.env.APTOS_FAUCET_URL || "https://faucet.devnet.aptoslabs.com";
//<:!:section_1

export const aptosCoinStore =
  "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>";


export const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 0xfff).toString(16);
}

export const getRandomSVG = () => {
  const baseURL = 'https://source.boringavatars.com'
  const type = ['','marble', 'beam', 'pixel', 'sunset', 'ring', 'bauhaus']
  const shape = ['', 'square']
  const selectType = type[Math.floor(Math.random() * 5)]
  const shapeType = shape[Math.floor(Math.random() * 1)]
  return `${baseURL}/${selectType}/120/${new Date().getTime()}?${shapeType}`
}
