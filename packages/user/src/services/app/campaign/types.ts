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

export type AddUserToWhiteListParams = {
  campaignId: string;
  publicKey: string;
  email: string;
};

export type CheckUserInWhiteListParams = {
  campaignId: string;
  publicKey: string;
};

export type CheckUserInWhiteListResponse = {
  isExisted: boolean;
};
