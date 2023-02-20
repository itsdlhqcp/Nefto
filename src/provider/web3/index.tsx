import { createContext, FunctionComponent, ReactNode, useContext, useState} from "react"
import * as React from 'react';
import { createDefaultState, Web3State } from "./utils";

  /// we install npm install ethers@5.6.2 and metamask dependensies to render from here
  const Web3Context = createContext<Web3State>(createDefaultState());
  

type Props = {
    children: ReactNode | ReactNode[]
  }

const Web3Provider: FunctionComponent<Props>  = ({children}) => {
    const [web3Api, setWeb3Api] = useState<Web3State>(createDefaultState())

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









