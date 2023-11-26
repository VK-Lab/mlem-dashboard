import { BigNumberish } from "@ethersproject/bignumber";

export type MintArgs = {
  token: string;
  owner: string;
  meta: Record<string, any>;
  amount: BigNumberish;
};
