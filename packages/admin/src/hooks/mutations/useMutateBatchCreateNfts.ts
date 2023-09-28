import { MutationKeys } from '@mlem/admin/enums/mutationKeys.enum';
import { batchCreateNfts } from '@mlem/admin/services/admin/nft';
import { BatchCreateNftsParams } from '@mlem/admin/services/admin/nft/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateBatchCreateNfts = (
  options?: UseMutationOptions<unknown, unknown, BatchCreateNftsParams, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: batchCreateNfts,
    mutationKey: MutationKeys.BATCH_CREATE_NFTS,
  });
};
