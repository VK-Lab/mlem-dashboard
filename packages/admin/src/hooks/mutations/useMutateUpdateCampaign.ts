import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { updateCampaign } from '@mlem-admin/services/admin/campaign';
import {
  UpdateCampaignParams,
  UpdateCampaignResponse,
} from '@mlem-admin/services/admin/campaign/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateUpdateCampaign = (
  options?: UseMutationOptions<
    UpdateCampaignResponse,
    unknown,
    UpdateCampaignParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateCampaign,
    mutationKey: MutationKeys.UPDATE_CAMPAIGN,
  });
};
