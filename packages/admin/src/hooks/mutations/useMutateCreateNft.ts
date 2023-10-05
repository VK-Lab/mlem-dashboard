import { useAccount } from '@casperdash/usewallet';
import { DeployStatusEnum } from '@mlem-admin/enums';
import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { NftTypeEnum } from '@mlem-admin/enums/nftType.enum';
import { createTempNft, updateNft } from '@mlem-admin/services/admin/nft';
import {
  CreateNftParams,
  CreateNftResponse,
} from '@mlem-admin/services/admin/nft/types';
import { signDeployNft } from '@mlem-admin/utils/casper/contract';
import { useMutation, UseMutationOptions } from 'react-query';

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
