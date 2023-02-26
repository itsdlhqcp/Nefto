import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers"
import { SWRResponse } from "swr";


export type Web3Dependencies = {
  provider: providers.Web3Provider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider
}

// export type CryptoHookFactory = {
//     (d: Partial<Web3Dependencies>): CryptoHandlerHook
//   }
// export type CryptoHandlerHook = (params: string) => CryptoSWRResponse
// export type CryptoSWRResponse = SWRResponse;

export type CryptoHookFactory<D = any, P = any> = {
    (d: Partial<Web3Dependencies>): CryptoHandlerHook<D, P>
  }
  
  export type CryptoHandlerHook<D = any, P = any> = (params?: P) => CryptoSWRResponse<D>
  
  export type CryptoSWRResponse<D = any> = SWRResponse<D>;



