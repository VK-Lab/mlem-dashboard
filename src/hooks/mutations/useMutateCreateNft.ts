import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createNft } from '@/services/admin/nft';
import { CreateNftParams, CreateNftResponse } from '@/services/admin/nft/types';

export const useMutateCreateNft = (
  options?: UseMutationOptions<
    CreateNftResponse,
    unknown,
    CreateNftParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: createNft,
    mutationKey: MutationKeys.CREATE_NFT,
  });
};
