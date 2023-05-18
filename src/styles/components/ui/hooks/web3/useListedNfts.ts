
import useSWR from "swr";
import { CryptoHookFactory } from "../../layouts/types/hooks";

type UseListedNftsResponse = {}
type ListedNftsHookFactory = CryptoHookFactory<any, UseListedNftsResponse>

export type UseListedNftsHook = ReturnType<ListedNftsHookFactory>

export const hookFactory: ListedNftsHookFactory = ({contract}) => () => {
  const {data, ...swr} = useSWR(
    contract ? "web3/useListedNfts" : null,
    async () => {
      const nfts = [] as any;
      return nfts;
    }
  )
  return {
    ...swr,
    data: data || [],
  };
}