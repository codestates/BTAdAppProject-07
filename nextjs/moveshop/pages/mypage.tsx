import {Box, Tab, Tabs, Typography} from "@mui/material";
import {ReactNode, SyntheticEvent, useState} from "react";
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import CollectedItems from "../components/collectedItems"

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: { index: number, value: any, children: ReactNode }) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`collection-tabpanel-${index}`}
      aria-labelledby={`collection-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%'}}>
        <Box sx={{ width : '90%', margin: '0 auto', minHeight: '100px', backgroundColor: "#5a849b", color: "#fff"}}>
          <Typography variant="h4" gutterBottom>
            {`address ${account?.address}`}
          </Typography>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width : '90%', margin: '0 auto'}}>
          <Tabs value={value} onChange={handleChange} aria-label="user tabs">
            <Tab label="Collected" {...a11yProps(0)} />
            <Tab label="Created" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ width : '90%', margin: '0 auto'}}>
          <TabPanel value={value} index={0}>
            <CollectedItems/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </>
  )
}
