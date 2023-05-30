import { CryptoHookFactory } from "@/types/hooks";
import { useEffect } from "react";
import useSWR from "swr";


// type AccountHookFactory = CryptoHookFactory<string>
type UseAccountResponse = {
  connect: () => void;
  isLoading: boolean;
  isInstalled: boolean;
}

type AccountHookFactory = CryptoHookFactory<string, UseAccountResponse>

// deps -> provider, ethereum, contract (web3State)
export type useAccountHook = ReturnType<AccountHookFactory>
export const hookFactory: AccountHookFactory = ({provider, ethereum, isLoading}) => () => {
  const {data, mutate, isValidating, ...swr} = useSWR(
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
      revalidateOnFocus: false,
      shouldRetryOnError: false
     }
  )

   ///HANDLING AFTER SIGNIN INTO ACCCOUNT
  useEffect(() => {
    ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    }
  })

  const handleAccountsChanged = (...args: unknown[]) => {
    const accounts = args[0] as string[];
    if (accounts.length === 0) {
      console.error("Please, connect to Web3 wallet");
    } else if (accounts[0] !== data) {
      mutate(accounts[0]);
    }
  }

  const connect = async () => {
    try {
      ethereum?.request({method: "eth_requestAccounts"});
    } catch(e) {
      console.error(e);
    }
  }

  return {
    ...swr,
    data,
    isValidating,
    isLoading: isLoading as boolean,
    isInstalled: ethereum?.isMetaMask || false,
    mutate,
    connect
  };
}

