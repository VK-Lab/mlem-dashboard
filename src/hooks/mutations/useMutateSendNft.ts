import { useAccount } from '@usedapptesthello/usewallet';
import { useMutation, UseMutationOptions } from 'react-query';

import { MutationKeys } from '@/enums/mutationKeys.enum';
import { sendNft } from '@/utils/casper/contract';

type Params = { toPublicKeyHex: string; tokenAddress: string; tokenId: string };

export const useMutateSendNft = (
  options?: UseMutationOptions<string | null, unknown, Params, unknown>
) => {
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      // await approveNft({
      //   fromPublicKeyHex: publicKey,
      //   tokenAddress: params.tokenAddress,
      //   tokenId: params.tokenId,
      // });

      const contractHash = await sendNft({
        fromPublicKeyHex: publicKey,
        toPublicKeyHex: params.toPublicKeyHex,
        tokenAddress: params.tokenAddress,
        tokenId: params.tokenId,
      });

      return contractHash;
    },
    mutationKey: [MutationKeys.SEND_NFT, publicKey],
  });
};
