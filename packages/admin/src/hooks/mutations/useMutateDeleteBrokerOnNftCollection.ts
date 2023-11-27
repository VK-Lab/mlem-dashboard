import { deleteBrokerOnNftCollection } from '@mlem-admin/services/admin/nft-collection';
import { UseMutationOptions, useMutation } from 'react-query';

type Params = {
  nftCollectionId: string;
};

export const useMutateDeleteBrokerOnNftCollection = (
  options?: UseMutationOptions<void, unknown, Params, unknown>
) => {
  const { mutate, ...rest } = useMutation({
    ...options,
    mutationFn: async (params: Params) => {
      await deleteBrokerOnNftCollection(params.nftCollectionId);

      return;
    },
  });
  return {
    mutate,
    ...rest,
  };
};
