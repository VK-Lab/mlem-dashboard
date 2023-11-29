import { Campaign } from "@mlem-user/types/campaign";

import {
  AddUserToWhiteListParams,
  CheckUserInWhiteListParams,
  GetCampaignsResponse,
  GetTotalWhitelistUsersParams,
} from "./types";
import request from "../request";

export const getFeaturedCampaigns = async (): Promise<Campaign[]> => {
  return request.get("/campaigns/featured");
};

export const getRunningCampaigns = async (): Promise<Campaign[]> => {
  return request.get("/campaigns/running");
};

export const getCampaigns = async (): Promise<GetCampaignsResponse> => {
  return request.get("/campaigns");
};

export const getCampaingDetail = async (id: string): Promise<Campaign> => {
  return request.get(`/campaigns/${id}`);
};

export const addUserToWhitelist = async (
  data: AddUserToWhiteListParams
): Promise<void> => {
  return request.post(`/campaigns/${data.campaignId}/whitelist`, data);
};

export const checkUserInWhiteList = async (
  params: CheckUserInWhiteListParams
): Promise<void> => {
  return request.get(
    `/campaigns/${params.campaignId}/whitelist/${params.publicKey}`
  );
};

export const getTotalWhitelistUsers = async (
  campaignId: string
): Promise<GetTotalWhitelistUsersParams> => {
  return request.get(`/campaigns/${campaignId}/whitelist/total`);
};
