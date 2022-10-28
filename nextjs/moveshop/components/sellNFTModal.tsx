import {Button, Dialog, DialogContent} from "@mui/material";
import {NextPage} from "next";
import {useRecoilState} from "recoil";
import {sellNFTModalState, tokenIdState} from "../states/recoilState";
import {useWallet} from "@manahippo/aptos-wallet-adapter";

import {FAUCET_URL, NODE_URL} from "../utils/common";
import * as Gen from "@martiandao/aptos-web3-bip44.js/src/generated";
import {AptosAccount, AptosClient, CoinClient, FaucetClient, HexString, MaybeHexString, TokenClient} from "aptos";
import {WalletClient} from "@martiandao/aptos-web3-bip44.js";
import nacl from "tweetnacl";

interface SellNFTModalProps {
  address?: MaybeHexString;
}

export const SellNFTModal:NextPage<SellNFTModalProps> = (props) => {
  const [openSellNFTModal, setOpenSellNFTModal] = useRecoilState(sellNFTModalState)
  const [tokenId, setTokenId] = useRecoilState(tokenIdState)
  const {address} = props
  const {signAndSubmitTransaction, signMessage} = useWallet()



  const handleClose = () => {
    setOpenSellNFTModal(false)
  }

  const handleClickSell = () => {
    const walletClient = new WalletClient(NODE_URL, FAUCET_URL)
    const {creator, collection, name} = tokenId?.token_data_id
    const propertyVersion = Number(tokenId.property_version)
    const receiver = new HexString('0x9f11fdf9a238421e76fa5fe5918c71333c8c5bec225f8d8efa2a652459872198')
    const payload = {
      nonce: 'listing nft',
      message: 'listing nft',
    }

    const client = new AptosClient(NODE_URL)
    const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL)
    const tokenClient = new TokenClient(client);
    const receiverAptosAccount = new AptosAccount(null, receiver)

    const coinClient = new CoinClient(client);

    signAndSubmitTransaction()
    signMessage(payload).then(response => {

      const {address, fullMessage, signature } = response
      const key = address.slice(2, 66);
      const verified = nacl.sign.detached.verify(
        Buffer.from(fullMessage),
        Buffer.from(signature, "hex"),
        Buffer.from(key, "hex")
      );
      console.log(verified)
      const aptosAccount = new AptosAccount(null, address)
      console.log(aptosAccount)
      const result = tokenClient.directTransferToken(aptosAccount, receiverAptosAccount, creator, collection, name, 1, propertyVersion)
        .then(r => console.log(r))
    }).catch(e => console.log(e))
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={openSellNFTModal}
      onClose={handleClose}
    >
      <DialogContent>
        <Button variant={'contained'} onClick={handleClickSell}>판매</Button>
      </DialogContent>
    </Dialog>

  )
}
