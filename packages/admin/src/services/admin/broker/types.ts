import { Broker } from '@mlem-admin/types/broker';

export type CreateBrokerParams = Omit<Broker, 'id'> &
  Required<Pick<Broker, 'name' | 'contractId' | 'ownerPublicKey'>>;

export type CreateBrokerResponse = Broker;

export type UpdateBrokerParams = Partial<CreateBrokerParams>;

export type UpdateBrokerResponse = {
  id: string;
};

export type GetBrokersParams = {
  limit?: number;
  page?: number;
};

export type GetBrokersResponse = {
  items: Broker[];
  total: number;
};
