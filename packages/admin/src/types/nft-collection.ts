import { MintingMode } from '@mlem-admin/contracts/cep78';
import { DeployStatusEnum } from '@mlem-admin/enums';

import { Benefit } from './benefit';

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
  benefits: Benefit[];
  createdAt: string;
  deployHash: string;
  deployStatus: DeployStatusEnum;
  ownerPublicKey: string;
  nftImageUrl: string;
  mintingMode: MintingMode;
  brokerId?: string;
  brokerDeployHash?: string;
  brokerDeployStatus?: DeployStatusEnum;
};
