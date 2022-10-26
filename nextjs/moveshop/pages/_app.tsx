import '../styles/globals.css'
import type {AppProps} from 'next/app'
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";
import {RecoilRoot} from "recoil";

function MyApp({Component, pageProps}: AppProps) {
  return (
    <RecoilRoot>
      <CssBaseline/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
