import {Box, Tab, Tabs} from "@mui/material";
import React, {ReactNode, SyntheticEvent, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import CollectedItems from "../components/collectedItems";
import {SellNFTModal} from "../components/sellNFTModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <SellNFTModal address={account?.address}/>
      <Box sx={{ width: '100%'}}>
        <Box sx={{ width : '90%', margin: '0 auto', minHeight: '100px', backgroundColor: "#5a849b", color: "#fff"}}>
          {`address ${account?.address}`}
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width : '90%', margin: '0 auto'}}>
          <Tabs value={value} onChange={handleChange} aria-label="user tabs">
            <Tab label="Collected" {...a11yProps(0)} />
            <Tab label="Created" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ width : '90%', margin: '0 auto'}}>
          <TabPanel value={value} index={0}>
            <CollectedItems address={account?.address}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}
