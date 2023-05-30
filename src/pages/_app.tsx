import Navbar from '../styles/components/ui/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Web3Provider from '../provider/web3'
import { BaseLayout } from '@/styles/components/ui'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
///whole differnt components of app are routed and render from here to form a complete apk
export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <ToastContainer />
    <Web3Provider>
    <Navbar/>
      <BaseLayout> 
      <Component {...pageProps} />
      </BaseLayout>
    </Web3Provider>
    </>
  ) 
}

