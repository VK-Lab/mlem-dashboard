import { Campaign } from '@mlem-admin/types/campaign';
import { Dayjs } from 'dayjs';

export type GetCampaignsParams = {
  limit: number;
  page: number;
};

export type GetCampaignsResponse = {
  items: Campaign[];
  total: number;
};

export type UpdateCampaignParams = {
  id: string;
  name: string;
  imageUrl?: string;
  description: string;
  nftCollectionIds: string[];
  startDate?: Dayjs | string;
  endDate?: Dayjs | string;
};

export type UpdateCampaignResponse = {
  id: string;
};

export type CreateCampaignParams = Omit<UpdateCampaignParams, 'id'> & {
  nftCollectionIds: string[];
};

export type CreateCampaignResponse = {
  id: string;
};
