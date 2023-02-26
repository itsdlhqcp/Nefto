import useSWR from "swr";
import { CryptoHookFactory } from "../../layouts/types/hooks";

type AccountHookFactory = CryptoHookFactory<string>

// deps -> provider, ethereum, contract (web3State)
export type useAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory= ({provider}) => () => {
  

 const swrRes = useSWR(
    provider ? "web3/useAccount" :null,   
    async () => {
      const accounts =await provider!.listAccounts();
      console.log(accounts);
      const account = accounts[0];
      if (!account) {
        throw "Cannot retrieve account! please ,connnect to web3 wallet."
      }
      return account;  ///if there provider list avail acctnts
     }, {
      revalidateOnFocus: false
     }
  )

  return swrRes;
}

