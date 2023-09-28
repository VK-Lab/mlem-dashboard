import { DeployStatusEnum } from '@mlem/admin/enums';
import { NftCollection } from '@mlem/admin/types/nft-collection';
import { Tier } from '@mlem/admin/types/tier';

import { Benefit } from './benefit';
import { ClaimStatusEnum } from './claim';

export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
};

export type Nft = {
  _id: string;
  tokenHash: string;
  benefits: Benefit[];
  claims: NftClaim[];
  createdAt: string;
  description: string;
  imageUrl: string;
  name: string;
  tokenAddress: string;
  tokenId: string;
  updatedAt: string;
  contractType: string;
  id: string;
  tierId?: string;
  ownerOf: string;
  deployStatus: DeployStatusEnum;
  deployHash: string;
  nftCollection: Partial<NftCollection>;
  tier?: Tier;
};

export type NftClaim = {
  benefitId: string;
  status: ClaimStatusEnum;
  generatedCode?: string;
};

export type EvmNft = {
  tokenAddress: string;
  tokenId: string;
  contractType: string;
  ownerOf: string;
  blockNumber: string;
  blockNumberMinted: string;
  tokenUri?: string | undefined;
  metadata?: NftMetadata;
  amount?: string | undefined;
  name: string;
  symbol: string;
  tokenHash: string;
  lastTokenUriSync: string;
  lastMetadataSync: string;
};
