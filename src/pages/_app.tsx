import Navbar from '../styles/components/ui/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Provider from '../provider/web3'
import { BaseLayout } from '@/styles/components/ui'
///whole differnt components of app are routed and render from here to form a complete apk
export default function App({ Component, pageProps }: AppProps) {
  return(
  
    <>
    <Navbar/>
    <Web3Provider>
      <BaseLayout> 
      <Component {...pageProps} />
      </BaseLayout>
    </Web3Provider>
    </>
  ) 
}

