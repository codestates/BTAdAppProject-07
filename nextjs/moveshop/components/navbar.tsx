import React, {useState} from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {useRecoilState} from "recoil";
import {walletModalState} from "../states/recoilState"
import {useWallet,} from "@manahippo/aptos-wallet-adapter";
import {WalletModal} from "./walletModal";

const drawerWidth = 240;

export default function Navbar() {
  const { connected, disconnect } = useWallet();
  const [open, setOpen] = useState(false)

  // recoil에서 state 값 가져오기
  const [openWalletModal, setOpenWalletModal] = useRecoilState(walletModalState)

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleConnectWallet = () => {
    if(connected) disconnect()
    else setOpenWalletModal(true)
  }

  // api에서 메뉴 받아오기
  const menu = {
    'default': [
      {
        id: 1,
        auth: false,
        text: 'collections',
      },
    ],
    'personal': [
      {
        id: 3,
        auth: true,
        text: 'my page',
      },
      {
        id: 4,
        auth: true,
        text: 'create NFT',
      }
    ],
  }

  return (
    <>
      <WalletModal/>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawer}
          edge="start"
          sx={{mr: 2, ...(open && {display: 'none'})}}
        >
          <MenuIcon/>
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="left"
        open={open}
        onClose={handleDrawer}
      >
        <Box
          sx={{width: drawerWidth}}
          role="presentation"
          onClick={handleDrawer}
        >
          <List>
            <ListItem>
              <Button
                variant={'outlined'}
                startIcon={<AccountBalanceWalletIcon/>}
                fullWidth={true}
                onClick={handleConnectWallet}
              >
                {connected ? 'Disconnect' : 'Connect'}
              </Button>
            </ListItem>
            {menu.default.map(menu => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={menu.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List>
            {connected && menu.personal.map(menu => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton>
                  <ListItemText primary={menu.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
