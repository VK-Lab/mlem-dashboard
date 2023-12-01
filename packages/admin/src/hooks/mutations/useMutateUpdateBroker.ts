import { useAccount } from '@casperdash/usewallet';
import { sign } from '@casperdash/usewallet-core';
import { BrokerClientInstance } from '@mlem-admin/contracts/broker';
import { MutationKeys } from '@mlem-admin/enums/mutationKeys.enum';
import { updateBroker } from '@mlem-admin/services/admin/broker';
import {
  UpdateBrokerParams,
  UpdateBrokerResponse,
} from '@mlem-admin/services/admin/broker/types';
import { deploy } from '@mlem-admin/services/proxy';
import { Broker } from '@mlem-admin/types/broker';
import { CLPublicKey, DeployUtil, csprToMotes } from 'casper-js-sdk';
import { useMutation, UseMutationOptions } from 'react-query';

export type UseMutateUpdateBrokerParams = {
  id: string;
} & UpdateBrokerParams &
  Pick<Broker, 'contractHash'>;

export const useMutateUpdateBroker = (
  options?: UseMutationOptions<
    UpdateBrokerResponse,
    unknown,
    UseMutateUpdateBrokerParams,
    unknown
  >
) => {
  const { publicKey } = useAccount();

  return useMutation({
    ...options,
    mutationFn: async ({
      id,
      contractHash,
      ...params
    }: UseMutateUpdateBrokerParams) => {
      if (!publicKey) {
        throw new Error('Public key is required');
      }

      BrokerClientInstance.setContractHash(`hash-${contractHash}`);

      const buildedDeploy = BrokerClientInstance.setMintingFee(
        {
          amount: csprToMotes(params.mintingFee).toString(),
        },
        `${5_000_000_000}`,
        CLPublicKey.fromHex(publicKey)
      );

      const signedDeploy = await sign({
        deploy: DeployUtil.deployToJson(buildedDeploy),
        signingPublicKeyHex: publicKey,
        targetPublicKeyHex: publicKey,
      });

      const deployHash = await deploy(signedDeploy);

      console.log('deployHash: ', deployHash);

      return updateBroker(id, params);
    },
    mutationKey: MutationKeys.UPDATE_BROKER,
  });
};
