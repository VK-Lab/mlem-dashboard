import { useAccount } from '@usedapptesthello/usewallet';
import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { registerTokenOwner } from '@/utils/casper/contract';

export const useMutateRegisterTokenOwner = (
  options?: UseMutationOptions<
    string,
    unknown,
    { tokenAddress: string },
    unknown
  >
) => {
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async (params: { tokenAddress: string; id: string }) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      const { contractHash } = await registerTokenOwner(
        params.tokenAddress,
        publicKey
      );

      return contractHash;
    },
    mutationKey: [MutationKeys.CONFIRM_NFT_COLLECTION, publicKey],
  });
};
