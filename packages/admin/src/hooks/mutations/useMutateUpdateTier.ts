import { MutationKeys } from '@mlem/admin/enums/mutationKeys.enum';
import { updateTier } from '@mlem/admin/services/admin/tier';
import {
  UpdateTierParams,
  UpdateTierResponse,
} from '@mlem/admin/services/admin/tier/types';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions } from 'react-query';

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
