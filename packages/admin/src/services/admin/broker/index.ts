import { Broker } from '@mlem-admin/types/broker';
import request from '@mlem-admin/utils/request';

import {
  CreateBrokerParams,
  CreateBrokerResponse,
  GetBrokersParams,
  GetBrokersResponse,
} from './types';

export const getBrokers = (
  params?: GetBrokersParams
): Promise<GetBrokersResponse> => {
  return request.get('/admin/brokers', {
    params,
  });
};

export const getBroker = (id: string): Promise<Broker> => {
  return request.get(`/admin/brokers/${id}`);
};

export const createBroker = (
  params: CreateBrokerParams
): Promise<CreateBrokerResponse> => {
  return request.post('/admin/brokers', params);
};
