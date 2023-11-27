import { useAccount } from '@casperdash/usewallet';
import { createBroker } from '@mlem-admin/services/admin/broker';
import { CreateBrokerParams } from '@mlem-admin/services/admin/broker/types';
import { signDeployBroker } from '@mlem-admin/utils/casper/contract';
import { slugify, toMotes } from '@mlem-admin/utils/format';
import { UseMutationOptions, useMutation } from 'react-query';

export const useMutateCreateBroker = (
  options?: UseMutationOptions<unknown, unknown, CreateBrokerParams, unknown>
) => {
  const { publicKey } = useAccount();

  const { mutate, ...rest } = useMutation({
    ...options,
    mutationFn: async (params: CreateBrokerParams) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      const contractId = slugify(params.name);

      const { deployHash } = await signDeployBroker({
        publicKeyHex: publicKey,
        name: params.name,
        mintingFee: toMotes(params.mintingFee),
        maxOwnedTokens: params.maxOwnedTokens,
        id: slugify(params.name),
      });

      return createBroker({
        ...params,
        deployHash,
        contractId,
        ownerPublicKey: publicKey,
      });
    },
  });
  return {
    mutate,
    ...rest,
  };
};
