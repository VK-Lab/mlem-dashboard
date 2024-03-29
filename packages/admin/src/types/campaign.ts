import { Benefit } from './benefit';
import { NftCollection } from './nft-collection';

export type Campaign = {
  id: string;
  name: string;
  description: string;
  benefits: Benefit[];
  createdAt: string;
  nftCollectionIds: string[];
  benefitIds: string[];
  nftCollections: NftCollection[];
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  isOpenWhitelist?: boolean;
  shortDescription?: string;
  isAllowWhitelistUser?: boolean;
};
