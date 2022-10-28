// @ts-nocheck
import {Box, Tab, Tabs} from "@mui/material";
import React, {ReactNode, SyntheticEvent, useEffect, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import MyCollectedList from "../components/myCollectedList";
import {SellNFTModal} from "../components/sellNFTModal";
import {getRandomColor} from "../utils/common";
import MyCollectionList from "../components/myCollectionList";

const TabPanel = (props: { index: number, value: any, children: ReactNode }) => {

  const { children, value, index, ...other } = props;
  return (
    <Box>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `collection-${index}`,
    'aria-controls': `collection-tabpanel-${index}`,
  };
}

export default function MyPage() {
  const {account} = useWallet()
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [bgColor, setBGColor] = useState('')

  useEffect(() => {
    setBGColor(getRandomColor())
  }, [])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <SellNFTModal address={account?.address}/>
      <Box sx={{ width: '100%'}}>
        <Box sx={{height: "300px", padding: "20px", backgroundColor: `${bgColor}`, color: "#fff", position: 'relative'}}>
          <h2>내 지갑 주소</h2>
          <h3>{`${account?.address}`}</h3>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width : '90%', margin: '0 auto'}}>
          <Tabs value={value} onChange={handleChange} aria-label="user tabs">
            <Tab label="Collected" {...a11yProps(0)} />
            <Tab label="Created collections" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ width : '90%', margin: '0 auto'}}>
          <TabPanel value={value} index={0}>
            <MyCollectedList address={account?.address}/>
          </TabPanel>
          <TabPanel index={value} value={1}>
            <MyCollectionList address={account?.address}/>
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}
