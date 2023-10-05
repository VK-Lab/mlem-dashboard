import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { updateNft } from '@mlem-admin/services/admin/nft';
import {
  UpdateNftParams,
  UpdateNftResponse,
} from '@mlem-admin/services/admin/nft/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateUpdateNft = (
  options?: UseMutationOptions<
    UpdateNftResponse,
    unknown,
    UpdateNftParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateNft,
    mutationKey: MutationKeys.UPDATE_NFT,
  });
};
