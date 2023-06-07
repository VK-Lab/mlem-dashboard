import { useAccount } from '@casperdash/usewallet';
import { useMutation, UseMutationOptions } from 'react-query';

import { DeployStatusEnum } from '@/enums';
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

      const deployHash = await signDeployNft({
        publicKeyHex: publicKey,
        name: params.name,
        tokenAddress: params.tokenAddress,
        tokenId: params.tokenId,
      });

      return createNft({
        ...params,
        deployHash,
        deployStatus: DeployStatusEnum.PENDING,
      });
    },
    mutationKey: [MutationKeys.CREATE_NFT, publicKey],
  });
};
