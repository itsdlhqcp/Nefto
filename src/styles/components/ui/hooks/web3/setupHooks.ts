import { Web3Dependencies } from "@/types/hooks";
import { hookFactory as createAccountHook, useAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, useNetworkHook } from "./useNetwork";
import { hookFactory as createListedNftsHook, UseListedNftsHook } from "./useListedNfts";
import {  hookFactory as createOwnedNftsHook,UseOwnedNftsHook } from "./useOwnedNfts";

export type Web3Hooks = {
  useAccount: useAccountHook;
  useNetwork: useNetworkHook;
  useListedNfts: UseListedNftsHook;
  useOwnedNfts: UseOwnedNftsHook;
}

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps),
    useListedNfts: createListedNftsHook(deps),
    useOwnedNfts: createOwnedNftsHook(deps),
  }
}