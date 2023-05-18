import { createContext, FunctionComponent, ReactNode, useContext, useState} from "react";
import * as React from 'react';
import { createDefaultState, createWeb3State, loadContract, Web3State } from "./utils";
import { ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { NftMarketContract } from "@/styles/components/ui/layouts/types/nftMarketContract";

function pageReload() {
  window.location.reload();
}

const handleAccount = (ethereum: MetaMaskInpageProvider) => async () => {
  const isLocked =  !(await ethereum._metamask.isUnlocked());
  if (isLocked) { pageReload(); }
}

const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum.on("chainChanged", pageReload);
  ethereum.on("accountsChanged", handleAccount(ethereum));
}

const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  ethereum?.removeListener("chainChanged", pageReload);
  ethereum?.removeListener("accountsChanged", handleAccount);
}


  /// we install npm install ethers@5.6.2 and metamask dependensies to render from here
  const Web3Context = createContext<Web3State>(createDefaultState());
 

type Props = {
    children: ReactNode | ReactNode[]
  }

const Web3Provider: FunctionComponent<Props>  = ({children}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState());

  React.useEffect(() => {                          
   async function initWeb3() {                                      ///LOADS ETH FROM UTILS FILE
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const contract =  await loadContract("NftMarket", provider);

      const signer = provider.getSigner();
        const signedContract = contract.connect(signer);
    
      setGlobalListeners(window.ethereum);
      setWeb3Api(createWeb3State({
        ethereum: window.ethereum,
        provider,
        contract: signedContract as unknown as NftMarketContract,
        isLoading: false
      }))
    } catch(e: any) {
      console.log(e.message)
      console.log(e);
      console.error("Please, install web3 wallet");
      setWeb3Api((api) => createWeb3State({
        ...api as any,
        isLoading: false,
      }))
    }
    }

    initWeb3();
    return () => removeGlobalListeners(window.ethereum);
  }, [])

  const setGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
    ethereum.on("chainChanged", pageReload);
  }

  // const removeGlobalListeners = (ethereum: MetaMaskInpageProvider) => {
  //   ethereum.removeListener("chainChanged", pageReload);
  // }
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

  export function useHooks() {
    const { hooks } = useWeb3();
    return hooks;
  }
  
  export default Web3Provider;








