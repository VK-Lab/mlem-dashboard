import { Campaign } from "@mlem-user/types/campaign";

export type GetFeatureCampaigns = Campaign[];

export type GetRunningCampaigns = Campaign[];

export type GetCampignDetailParams = {
  id: string;
};

export type GetCampaignDetail = Campaign;

export type GetCampaignsResponse = {
  items: Campaign[];
  total: number;
};
