import { useAccount } from '@casperdash/usewallet';
import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { createNft } from '@/services/admin/nft';
import { CreateNftParams, CreateNftResponse } from '@/services/admin/nft/types';
import { signDeployNft } from '@/utils/casper/contract';

export const useMutateCreateNft = (
  options?: UseMutationOptions<
    CreateNftResponse,
    unknown,
    CreateNftParams,
    unknown
  >
) => {
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async (params: CreateNftParams) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      await signDeployNft({
        publicKeyHex: publicKey,
        name: params.name,
        tokenAddress: params.tokenAddress,
        tokenId: params.tokenId,
      });
      return createNft(params);
    },
    mutationKey: [MutationKeys.CREATE_NFT, publicKey],
  });
};
