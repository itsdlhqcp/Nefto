import { createContext, FunctionComponent, ReactNode, useContext, useState} from "react";
import * as React from 'react';
import { createDefaultState, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";

  /// we install npm install ethers@5.6.2 and metamask dependensies to render from here
  const Web3Context = createContext<Web3State>(createDefaultState());
 

type Props = {
    children: ReactNode | ReactNode[]
  }

const Web3Provider: FunctionComponent<Props>  = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  React.useEffect(() => {                          
   async function initWeb3() {                                      ///LOADS ETH FROM UTILS FILE
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const contract =  await loadContract("NftMarket", provider);
      
      setWeb3Api({
        ethereum: window.ethereum,             ///RENDERS AT SCREEN LEVEL
        provider,
        contract,
        isLoading: false
      })
    }

    initWeb3();
  }, [])
                  ///DETAILS AT WEB LEVEL LOADED AND RENDER BELOW
    return (
        <Web3Context.Provider value={web3Api}>
            {children}                                 
        </Web3Context.Provider>
    )
}

export function useWeb3() {
    return useContext(Web3Context);
  }
  
  export default Web3Provider;









