import { useAccount } from '@casperdash/usewallet';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';

import { useI18nToast } from '../useToast';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createNftCollection } from '@/services/admin/nft-collection';
import { CreateNftCollectionParams } from '@/services/admin/nft-collection/types';
import { signDeployNftCollection } from '@/utils/casper/contract';

export const useMutateCreateNftCollection = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    CreateNftCollectionParams,
    unknown
  >
) => {
  const { toastError } = useI18nToast();
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async (params) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }
      const { deployHash } = await signDeployNftCollection({
        publicKeyHex: publicKey,
        name: params.name,
      });

      return createNftCollection({
        ...params,
        deployHash,
      });
    },
    onError: (err: Error) => {
      toastError(_get(err, 'message'));
    },
    mutationKey: [MutationKeys.CREATE_NFT_COLLECTION, publicKey],
  });
};
