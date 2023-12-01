import { DeployStatusEnum } from "@mlem-user/enums";

import { Broker } from "./broker";

export type NftCollection = {
  id: string;
  name: string;
  symbol: string;
  totalTokenSupply: number;
  description: string;
  tokenAddress: string;
  contractPackageHash: string;
  contractType: string;
  chainId: string;
  benefitIds?: string[];
  createdAt: string;
  deployHash: string;
  deployStatus: DeployStatusEnum;
  ownerPublicKey: string;
  nftImageUrl?: string;
  broker: Broker;
};
