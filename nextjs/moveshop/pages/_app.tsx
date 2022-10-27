import '../styles/globals.css'
import type {AppProps} from 'next/app'
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";
import {RecoilRoot} from "recoil";
import {AptosWalletAdapter, MartianWalletAdapter, WalletProvider} from "@manahippo/aptos-wallet-adapter";
import {useMemo} from "react";

function MyApp({Component, pageProps}: AppProps) {
  const defaultWallets = useMemo(
    () => [
      new AptosWalletAdapter(),
      new MartianWalletAdapter(),
    ],
    []
  );

  return (
    <RecoilRoot>
      <WalletProvider wallets={defaultWallets} autoConnect={true}>
        <CssBaseline/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </RecoilRoot>
  )
}

export default MyApp
