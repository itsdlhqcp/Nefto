import { setupHooks, Web3Hooks } from "@/styles/components/ui/hooks/web3/setupHooks";
import { Web3Dependencies } from "@/styles/components/ui/layouts/types/hooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";


declare global {
  interface Window {                               ///HELP TO IMPLIMENT METAMASK AT INTRACTING LEVEL
    ethereum: MetaMaskInpageProvider;
  }
}

type Nullable<T> = {
 [P in keyof T]: T[P] | null;
}

export type Web3State = {
  isLoading: boolean;                      // true while loading web3State
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>

export const createDefaultState = () => {
  return {
    ethereum: null,
    provider: null,
    contract: null,
    isLoading: true,
    hooks: setupHooks({isLoading: true} as any)
  }
}

export const createWeb3State = ({
  ethereum,provider,contract,isLoading
}: Web3Dependencies ) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ethereum, provider, contract, isLoading})
  }
}

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  name: string,  // NftMarket
  provider: providers.Web3Provider
): Promise<Contract> => {

  if (!NETWORK_ID) {                                           ///IF NETWORK ID NOT DEFINED REJECT PROCESS
    return Promise.reject("Network ID is not defined!");
  }

  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();                   ///FETCH DATA FROM META JSON ADRESS ETH BLOCK CHAIN FROM CONTRACTS JSON FILE

  if (Artifact.networks[NETWORK_ID].address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,       
      Artifact.abi,
      provider
    )

    return contract;
  } else {
    return Promise.reject(`Contract: [${name}] cannot be loaded!`);        ///CONTRACT NAME LOADED FROM JSON FILE IF VALID
  }
}