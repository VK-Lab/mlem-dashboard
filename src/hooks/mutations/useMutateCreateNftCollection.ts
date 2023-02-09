import { useEffect } from 'react';

import { useSDK } from '@thirdweb-dev/react';
import _get from 'lodash/get';
import { useMutation, UseMutationOptions } from 'react-query';
import { useAccount, useSigner } from 'wagmi';

import { useI18nToast } from '../useToast';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createNftCollection } from '@/services/admin/nft-collection';
import { CreateNftCollectionParams } from '@/services/admin/nft-collection/types';

export const useMutateCreateNftCollection = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    CreateNftCollectionParams,
    unknown
  >
) => {
  const { toastError } = useI18nToast();
  const { address } = useAccount();
  const sdk = useSDK();
  const { data: signer } = useSigner();

  useEffect(() => {
    if (sdk && signer) {
      sdk.deployer.updateSignerOrProvider(signer);
    }
  }, [signer, sdk]);

  return useMutation({
    ...options,
    mutationFn: async (params) => {
      if (!sdk || !address) {
        return;
      }

      const contractAddress = await sdk.deployer.deployNFTCollection({
        name: params.name,
        primary_sale_recipient: address as string,
      });

      return createNftCollection({
        ...params,
        tokenAddress: contractAddress,
      });
    },
    onError: (err: Error) => {
      if (typeof err === 'object') {
        const isActionRejected = err.message.search(
          'user rejected transaction'
        );

        if (isActionRejected) {
          toastError('action_rejected');
          return;
        }
      }

      toastError(_get(err, 'code', 'gas_fee_balance'));
    },
    mutationKey: MutationKeys.CREATE_NFT_COLLECTION,
  });
};
