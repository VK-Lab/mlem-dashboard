import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { getBrokers } from '@mlem-admin/services/admin/broker';
import {
  GetBrokersParams,
  GetBrokersResponse,
} from '@mlem-admin/services/admin/broker/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetBrokers = (
  query: Partial<GetBrokersParams> = {},
  options: Omit<
    UseQueryOptions<
      GetBrokersResponse,
      unknown,
      GetBrokersResponse,
      QueryKeys.BROKERS
    >,
    'queryKey' | 'queryFn'
  > = {}
) => {
  return useQuery(QueryKeys.BROKERS, () => getBrokers(query), {
    ...options,
    refetchOnWindowFocus: true,
  });
};
