
import Navbar from '@/styles/components/navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
///whole differnt components of app are routed and render from here to form a complete apk
export default function App({ Component, pageProps }: AppProps) {
  return(
    
    <>
    <Navbar/>
    <Component {...pageProps} /></>
  ) 
}
