import { Web3Dependencies } from "../../layouts/types/hooks";
import { hookFactory as createAccountHook, useAccountHook } from "./useAccount";
import { hookFactory as createNetworkHook, useNetworkHook } from "./useNetwork";

export type Web3Hooks = {
  useAccount: useAccountHook;
  useNetwork: useNetworkHook;
}

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps),
    useNetwork: createNetworkHook(deps)
  }
}