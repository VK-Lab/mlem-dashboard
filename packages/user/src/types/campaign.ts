import { CampaignStatusEnum } from "@mlem-user/enums/campaign-status";
import { CampaignTypesEnum } from "@mlem-user/enums/campaign-types";

import { Benefit } from "./benefit";
import { NftCollection } from "./nft-collection";

export type Campaign = {
  id: string;
  name: string;
  type: CampaignTypesEnum;
  description: string;
  startDate: string;
  status: CampaignStatusEnum;
  endDate: string;
  imageUrl: string;
  thumbnailUrl: string;
  benefits: Benefit[];
  createdAt: string;
  nftCollectionIds: string[];
  benefitIds: string[];
  nftCollections: NftCollection[];
  isOpenWhitelist?: boolean;
  shortDescription?: string;
};
