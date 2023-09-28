import { MutationKeys } from '@mlem/admin/enums/mutationKeys.enum';
import { updateNftCollection } from '@mlem/admin/services/admin/nft-collection';
import {
  UpdateNftCollectionParams,
  UpdateNftCollectionResponse,
} from '@mlem/admin/services/admin/nft-collection/types';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateUpdateNftCollection = (
  options?: UseMutationOptions<
    UpdateNftCollectionResponse,
    unknown,
    UpdateNftCollectionParams,
    unknown
  >
) => {
  return useMutation({
    ...options,
    mutationFn: updateNftCollection,
    mutationKey: MutationKeys.UPDATE_NFT_COLLECTION,
  });
};
