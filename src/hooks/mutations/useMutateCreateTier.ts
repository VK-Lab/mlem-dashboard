import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createTier } from '@/services/admin/tier';
import {
  CreateTierParams,
  CreateTierResponse,
} from '@/services/admin/tier/types';

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
