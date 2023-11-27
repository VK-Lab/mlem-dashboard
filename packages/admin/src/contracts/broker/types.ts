import { BigNumberish } from 'ethers';

export type InstallArgs = {
  id: string;
  name: string;
  mintingFee: BigNumberish;
  maxOwnedTokens: BigNumberish;
};
