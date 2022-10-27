import {useWallet, Wallet} from "@manahippo/aptos-wallet-adapter";
import {useRecoilState} from "recoil";
import {walletModalState} from "../states/recoilState";
import {Box, Button, Dialog, DialogContent, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export function WalletModal() {
  const { wallets, connect } = useWallet();
  const [openWalletModal, setOpenWalletModal] = useRecoilState(walletModalState)

  async function connectWallet(wallet: Wallet) {
    connect(wallet.adapter.name).catch(e => console.log(e))
    setOpenWalletModal(false)
  }

  const handleClose = () => {
    setOpenWalletModal(false)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={openWalletModal}
      onClose={handleClose}
    >
      <DialogContent>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{
            position: 'absolute'
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            margin: '50px auto 0px'
          }}
        >
          {wallets.map((wallet: Wallet, i) => {
            return (
              <Button
                key={i}
                fullWidth={true}
                variant={'outlined'}
                onClick={() => connectWallet(wallet)}
                sx={{
                  borderColor: 'black',
                  color: 'black',
                  marginBottom: '20px',
                }}
              >
               {/* <Image width={20} height={20} src={wallet.adapter.icon} />*/}
                {wallet.adapter.name}
              </Button>
            );
          })}
        </Box>
      </DialogContent>
    </Dialog>

  )
}
