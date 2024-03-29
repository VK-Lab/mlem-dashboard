import request from '@mlem-admin/utils/request';

import {
  CreateTierParams,
  CreateTierResponse,
  GetTiersParams,
  GetTiersResponse,
  UpdateTierParams,
  UpdateTierResponse,
} from './types';

export const getTiers = (
  params: GetTiersParams = {}
): Promise<GetTiersResponse> => {
  return request.get('/admin/tiers', { params });
};

export const createTier = (
  params: CreateTierParams
): Promise<CreateTierResponse> => {
  return request.post('/admin/tiers', params);
};

export const updateTier = (
  id: string,
  params: UpdateTierParams = {}
): Promise<UpdateTierResponse> => {
  return request.put(`/admin/tiers/${id}`, params);
};
