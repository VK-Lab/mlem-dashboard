import { DeployStatusEnum } from '@mlem-admin/enums';

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
  campaignId?: string;
  benefitIds?: string[];
  createdAt: string;
  deployHash: string;
  deployStatus: DeployStatusEnum;
  ownerPublicKey: string;
  nftImageUrl: string;
};
