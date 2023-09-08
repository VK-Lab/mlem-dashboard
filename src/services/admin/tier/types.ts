import { Tier } from '@/types/tier';

export type CreateTierParams = {
  name: string;
  description?: string;
  nftCollectionId: string;
  benefitIds?: string[];
  slug?: string;
};

export type CreateTierResponse = {
  id: string;
};

export type UpdateTierParams = Partial<CreateTierParams>;

export type UpdateTierResponse = {
  id: string;
};

export type GetTiersParams = {
  limit?: number;
  page?: number;
};

export type GetTiersResponse = {
  items: Tier[];
  total: number;
};
