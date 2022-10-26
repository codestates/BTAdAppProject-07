import React, {useEffect, useState} from "react";
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
import {AddressState, PublicKeyState} from "../states/recoilState"
import {connectWallet, disconnectWallet} from "../utils/wallet"


const drawerWidth = 240;

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  // recoil에서 state 값 가져오기
  const [publicKey, setPublicKeyState] = useRecoilState(PublicKeyState)
  const [address, setAddressState] = useRecoilState(AddressState)

  useEffect(() => {
    const publicKeyLocalstorage = localStorage.getItem('publicKey')
    const addressLocalStorage = localStorage.getItem('address')
    setPublicKeyState(publicKeyLocalstorage)
    setAddressState(addressLocalStorage)
    setIsLogin(!!publicKey)
  }, [isLogin])

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleConnectWallet = () => {
    if (!isLogin) {
      connectWallet().then(
        result => {
          const {publicKey, address} = result
          setPublicKeyState(publicKey)
          setAddressState(address)
          setIsLogin(true)
        })
        .catch(e => {
          console.log('connect wallet error')
          console.log(e)
        })
    } else {
      disconnectWallet().then(() => {
        setIsLogin(false)
      })
        .catch(e => console.log(e))
    }

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
                {isLogin? 'Disconnect' : 'Connect'}
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
            {menu.personal.map(menu => (
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
