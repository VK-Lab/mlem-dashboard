import { useAccount } from '@casperdash/usewallet';
import { useMutation, UseMutationOptions } from 'react-query';

import { DeployStatusEnum } from '@/enums';
import { MutationKeys } from '@/enums/mutationKeys.enum';
import { NftTypeEnum } from '@/enums/nftType.enum';
import { createTempNft, updateNft } from '@/services/admin/nft';
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
      if (!params.tokenAddress) {
        throw new Error('Token address does not exist');
      }

      const { id } = await createTempNft({
        ...params,
      });

      const { deployHash, checksum } = await signDeployNft({
        publicKeyHex: publicKey,
        name: params.name,
        nftId: id,
        tokenAddress: params.tokenAddress,
      });

      if (!deployHash) {
        throw new Error('Deploy hash does not exist');
      }

      return updateNft({
        ...params,
        id,
        deployHash,
        deployStatus: DeployStatusEnum.PENDING,
        type: NftTypeEnum.PERMANENT,
        checksum,
      });
    },
    mutationKey: [MutationKeys.CREATE_NFT, publicKey],
  });
};
