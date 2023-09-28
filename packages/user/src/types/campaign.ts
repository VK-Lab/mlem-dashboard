import { Benefit } from "./benefit";
import { NftCollection } from "./nft-collection";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
  benefits: Benefit[];
  createdAt: string;
  nftCollectionIds: string[];
  benefitIds: string[];
  nftCollections: NftCollection[];
};
