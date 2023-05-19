import { DeployStatusEnum } from '@/enums';

export type NftCollection = {
  id: string;
  name: string;
  description: string;
  tokenAddress: string;
  contractPackageHash: string;
  contractType: string;
  chainId: string;
  campaignId?: string;
  benefitIds?: string[];
  createdAt: string;
  deployHash: string;
  deployStatus: DeployStatusEnum;
  ownerPublicKey: string;
};
