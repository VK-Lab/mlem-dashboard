import { useAccount } from '@casperdash/usewallet';
import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { confirmNftCollection } from '@mlem-admin/services/admin/nft-collection';
import { ConfirmNftCollectionResponse } from '@mlem-admin/services/admin/nft-collection/types';
import { registerTokenOwner } from '@mlem-admin/utils/casper/contract';
import { useMutation, UseMutationOptions } from 'react-query';

export const useMutateRegisterTokenOwner = (
  options?: UseMutationOptions<
    ConfirmNftCollectionResponse,
    unknown,
    { name: string },
    unknown
  >
) => {
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async (params: { name: string; id: string }) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      const { contractHash } = await registerTokenOwner(params.name, publicKey);

      return confirmNftCollection({
        id: params.id,
        tokenAddress: contractHash,
      });
    },
    mutationKey: [MutationKeys.CONFIRM_NFT_COLLECTION, publicKey],
  });
};
