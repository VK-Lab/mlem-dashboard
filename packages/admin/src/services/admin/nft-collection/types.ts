import { NftCollection } from '@mlem-admin/types/nft-collection';
import { Tier } from '@mlem-admin/types/tier';

export type GetNftCollectionsParams = {
  limit?: number;
  page?: number;
  campaignId?: string;
};

export type GetNftCollectionsResponse = {
  items: NftCollection[];
  total: number;
};

export type UpdateNftCollectionParams = {
  id: string;
  name: string;
  description: string;
  benefitIds: string[];
};

export type UpdateNftCollectionResponse = {
  id: string;
};

export type CreateNftCollectionParams = Partial<NftCollection> &
  Pick<NftCollection, 'name' | 'totalTokenSupply' | 'symbol'>;

export type CreateNftCollectionResponse = {
  id: string;
};

export type ConfirmNftCollectionParams = Pick<
  NftCollection,
  'tokenAddress' | 'id'
>;

export type ConfirmNftCollectionResponse = {
  id: string;
};

export type GetTiersByNftCollectionParams = {
  limit?: number;
  page?: number;
  nftCollectionId?: string;
};

export type GetTiersByNftCollectionResponse = {
  items: Tier[];
  total: number;
};
