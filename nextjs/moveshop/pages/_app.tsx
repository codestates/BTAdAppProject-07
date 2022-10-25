import '../styles/globals.css'
import type { AppProps } from 'next/app'
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <CssBaseline/>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </>
  )
}

export default MyApp
