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
import {useRouter} from "next/router";
import {walletModalState} from "../states/recoilState"
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {WalletModal} from "./walletModal";

const drawerWidth = 240;

export default function Navbar() {
  const { connected, disconnect, account } = useWallet();
  const [open, setOpen] = useState(false)

  // recoil에서 state 값 가져오기
  const [openWalletModal, setOpenWalletModal] = useRecoilState(walletModalState)
  const router = useRouter()

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleClickListButton = route => {
    router.push(route)
  }

  const handleConnectWallet = () => {
    if(connected) {
      disconnect()
      router.push('/')
    }
    else setOpenWalletModal(true)
  }

  // api에서 메뉴 받아오기
  const defaultMenu = [
    {
      id: 0,
      route: '/',
      text: 'home',
    },
  ]

  const personalMenu = [
    {
      id: 3,
      route: '/mypage',
      text: 'my page',
    },
    {
      id: 4,
      route: '/nft/token',
      text: 'create NFT',
    }
  ]

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
          <List key={'default'}>
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
            {defaultMenu.map(menu => (
              <ListItem disablePadding key={menu.id}>
                <ListItemButton onClick={() => handleClickListButton(menu.route)}>
                  <ListItemText primary={menu.text}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider/>
          {
            connected &&
            <List key={'personal'}>
              {personalMenu.map(menu => (
                <ListItem disablePadding key={menu.id}>
                  <ListItemButton onClick={() => handleClickListButton(menu.route)}>
                    <ListItemText primary={menu.text}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          }
        </Box>
      </Drawer>
    </>
  )
}
