import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { getCampaigns } from '@mlem/admin/services/admin/campaign';
import { GetCampaignsResponse } from '@mlem/admin/services/admin/campaign/types';
import { useQuery, UseQueryOptions } from 'react-query';

export const useGetAllCampaigns = (
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      GetCampaignsResponse,
      [QueryKeys.CAMPAIGNS]
    >,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery([QueryKeys.CAMPAIGNS], () => getCampaigns(), {
    ...options,
  });
};
