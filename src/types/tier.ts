import { Benefit } from '@/types/benefit';

export type Tier = {
  id: string;
  name: string;
  description?: string;
  nftCollectionId: string;
  benefitIds: string[];
  benefits?: Benefit[];
  slug?: string;
  createdAt?: string;
};
