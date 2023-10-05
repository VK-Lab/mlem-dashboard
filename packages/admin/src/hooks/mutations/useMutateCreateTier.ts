import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { createTier } from '@mlem-admin/services/admin/tier';
import {
  CreateTierParams,
  CreateTierResponse,
} from '@mlem-admin/services/admin/tier/types';
import { UseMutationOptions, useMutation } from 'react-query';

export const useMutateCreateTier = (
  options?: UseMutationOptions<
    CreateTierResponse,
    unknown,
    CreateTierParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [MutationKeys.CREATE_TIER],
    mutationFn: async (params: CreateTierParams) => {
      return createTier(params);
    },
  });
};
