import { Campaign } from "@mlem-user/types/campaign";

import { GetCampaignsResponse } from "./types";
import request from "../request";

export const getFeaturedCampaigns = async (): Promise<Campaign[]> => {
  return request.get("/campaigns/features");
};

export const getRunningCampaigns = async (): Promise<Campaign[]> => {
  return request.get("/campaigns/runnings");
};

export const getCampaigns = async (): Promise<GetCampaignsResponse> => {
  return request.get("/campaigns");
};

export const getCampaingDetail = async (id: string): Promise<Campaign> => {
  return request.get(`/campaigns/${id}`);
};
