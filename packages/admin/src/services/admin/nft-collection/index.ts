import request from '@mlem-admin/utils/request';

import {
  CreateNftCollectionParams,
  CreateNftCollectionResponse,
  GetNftCollectionsParams,
  GetNftCollectionsResponse,
  UpdateNftCollectionParams,
  UpdateNftCollectionResponse,
  ConfirmNftCollectionParams,
  ConfirmNftCollectionResponse,
  GetTiersByNftCollectionParams,
} from './types';

export const getNftCollections = (
  params?: GetNftCollectionsParams
): Promise<GetNftCollectionsResponse> => {
  return request.get('/admin/nft-collections', {
    params,
  });
};

export const getTiersByNftCollection = ({
  nftCollectionId,
  ...rest
}: GetTiersByNftCollectionParams): Promise<GetNftCollectionsResponse> => {
  return request.get(`/admin/nft-collections/${nftCollectionId}/tiers`, {
    params: rest,
  });
};

export const updateNftCollection = ({
  id,
  ...rest
}: Partial<UpdateNftCollectionParams>): Promise<UpdateNftCollectionResponse> => {
  return request.put(`/admin/nft-collections/${id}`, rest);
};

export const deleteBrokerOnNftCollection = (
  id: string
): Promise<UpdateNftCollectionResponse> => {
  return request.delete(`/admin/nft-collections/${id}/broker`);
};

export const createNftCollection = (
  params: CreateNftCollectionParams
): Promise<CreateNftCollectionResponse> => {
  return request.post('/admin/nft-collections', params);
};

export const confirmNftCollection = ({
  id,
  ...params
}: ConfirmNftCollectionParams): Promise<ConfirmNftCollectionResponse> => {
  return request.post(`/admin/nft-collections/${id}/confirm`, params);
};
