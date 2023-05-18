import { useHooks } from "@/provider/web3";

export const useAccount = () => {
  const hooks = useHooks();
  const swrRes = hooks.useAccount();

  return {
    account: swrRes
  }
}

export const useNetwork = () => {
  const hooks = useHooks();
  const swrRes = hooks.useNetwork();

  return {
    network: swrRes
  }
}
//using listed nfts
export const useListedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useListedNfts();

  return {
    nfts: swrRes
  }
}

//user owned NFT export
export const useOwnedNfts = () => {
  const hooks = useHooks();
  const swrRes = hooks.useOwnedNfts();

  return {
    nfts: swrRes
  }
}