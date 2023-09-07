import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { updateTier } from '@/services/admin/tier';
import {
  UpdateTierParams,
  UpdateTierResponse,
} from '@/services/admin/tier/types';

type Params = UpdateTierParams & {
  id: string;
};

export const useMutateUpdateTier = (
  options?: UseMutationOptions<
    UpdateTierResponse,
    unknown,
    UpdateTierParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationKey: [MutationKeys.CREATE_TIER],
    mutationFn: async ({ id, ...rest }: Params) => {
      return updateTier(id, rest);
    },
  });
};
