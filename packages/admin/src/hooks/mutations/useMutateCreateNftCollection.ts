import { useAccount } from '@casperdash/usewallet';
import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { createNftCollection } from '@mlem-admin/services/admin/nft-collection';
import { CreateNftCollectionParams } from '@mlem-admin/services/admin/nft-collection/types';
import { signDeployNftCollection } from '@mlem-admin/utils/casper/contract';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';

import { useI18nToast } from '../useToast';

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

      // const { deployHash } = await signDeployNftCollection({
      //   publicKeyHex: publicKey,
      //   name: params.name,
      //   symbol: params.symbol,
      //   totalTokenSupply: params.totalTokenSupply,
      //   mintingMode: params.mintingMode,
      //   mintingFee: params.mintingFee,
      // });

      return createNftCollection({
        ...params,
        // deployHash,
        ownerPublicKey: publicKey,
        isAllowMintingFee: params.mintingFee ? true : false,
        mintingFee: params.mintingFee,
      });
    },
    onError: (err: Error) => {
      toastError(_get(err, 'message'));
    },
    mutationKey: [MutationKeys.CREATE_NFT_COLLECTION, publicKey],
  });
};
