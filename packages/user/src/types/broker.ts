import { DeployStatusEnum } from "@mlem-user/enums";

export type Broker = {
  id: string;
  contractId: string;
  name: string;
  description: string;
  contractHash: string;
  contractPackageHash: string;
  mintingFee: number;
  maxOwnedTokens: number;
  deployHash: string;
  deployStatus: DeployStatusEnum;
  createdAt: string;
  updatedAt: string;
  ownerPublicKey: string;
};
