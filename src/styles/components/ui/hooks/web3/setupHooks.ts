import { Web3Dependencies } from "../../layouts/types/hooks";
import { hookFactory as createAccountHook, useAccountHook } from "./useAccount";

export type Web3Hooks = {
  useAccount: useAccountHook;
}

export type SetupHooks = {
  (d: Web3Dependencies): Web3Hooks
}

export const setupHooks: SetupHooks = (deps) => {
  return {
    useAccount: createAccountHook(deps)
  }
}