import { useAccount } from '@casperdash/usewallet';
import { sign } from '@casperdash/usewallet-core';
import { CEP78ClientInstance } from '@mlem-admin/contracts/cep78';
import { updateNftCollection } from '@mlem-admin/services/admin/nft-collection';
import { deploy } from '@mlem-admin/services/proxy';
import { CLPublicKey, DeployUtil } from 'casper-js-sdk';
import { UseMutationOptions, useMutation } from 'react-query';

export type AssignContractBrokerParams = {
  brokerId: string;
  brokerContractHash: string;
  nftContractHash: string;
};

export const useMutateAssignContractBroker = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    AssignContractBrokerParams,
    unknown
  >
) => {
  const { publicKey } = useAccount();

  const { mutate, ...rest } = useMutation({
    ...options,
    mutationFn: async (params: AssignContractBrokerParams) => {
      if (!publicKey) {
        throw new Error('Public key does not exist');
      }

      CEP78ClientInstance.setContractHash(`hash-${params.nftContractHash}`);
      const deployBuilded = await CEP78ClientInstance.setVariables(
        {
          contractWhitelist: [params.brokerContractHash],
        },
        `${10_000_000_000}`,
        CLPublicKey.fromHex(publicKey)
      );

      const signedRegisterDeploy = await sign({
        deploy: DeployUtil.deployToJson(deployBuilded),
        signingPublicKeyHex: publicKey,
        targetPublicKeyHex: publicKey,
      });

      const deployHash = await deploy(signedRegisterDeploy);

      return updateNftCollection({
        brokerId: params.brokerId,
      });
    },
  });
  return {
    mutate,
    ...rest,
  };
};
