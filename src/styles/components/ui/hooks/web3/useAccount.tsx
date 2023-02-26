import useSWR from "swr";
import { CryptoHookFactory } from "../../layouts/types/hooks";

type AccountHookFactory = CryptoHookFactory<string>

// deps -> provider, ethereum, contract (web3State)
export type useAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory= ({provider}) => (params) => {
  

 const swrRes = useSWR(
    provider ? "web3/useAccount" :null,
     () => {
      return "Test User"
     }
  )

  return swrRes;
}

// export const useAccount = hookFactory({ethereum: null, provider: null});