import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { createCampaign } from '@mlem-admin/services/admin/campaign';
import {
  CreateCampaignParams,
  CreateCampaignResponse,
} from '@mlem-admin/services/admin/campaign/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateCreateCampaign = (
  options?: UseMutationOptions<
    CreateCampaignResponse,
    unknown,
    CreateCampaignParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createCampaign,
    mutationKey: MutationKeys.CREATE_CAMPAIGN,
  });
};
