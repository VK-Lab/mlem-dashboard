"use client";

import { useAccount, useSign } from "@casperdash/usewallet";
import { DeployStatusEnum } from "@mlem-user/enums";
import { MutationKeys } from "@mlem-user/enums/mutationKeys";
import { signDeployNft } from "@mlem-user/lib/cep78/utils";
import { createTempNft, updateTempNft } from "@mlem-user/services/nft";
import {
  CreateTempNftParams,
  CreateTempNftResponse,
} from "@mlem-user/services/nft/types";
import { deploy } from "@mlem-user/services/proxy";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { DeployUtil } from "casper-js-sdk";

export const useCreateNFT = (
  options?: UseMutationOptions<
    CreateTempNftResponse,
    unknown,
    CreateTempNftParams,
    unknown
  >
) => {
  const { publicKey } = useAccount();
  const { signAsync } = useSign();

  return useMutation({
    ...options,
    mutationFn: async (params: CreateTempNftParams) => {
      if (!publicKey) {
        throw new Error("Public key does not exist");
      }
      if (!params.tokenAddress) {
        throw new Error("Token address does not exist");
      }
      const { id } = await createTempNft({
        ...params,
      });

      const { deploy: deployData, checksum } = await signDeployNft({
        publicKeyHex: publicKey,
        name: params.name,
        nftId: id,
        tokenAddress: params.tokenAddress,
      });

      const signedDeploy = await signAsync({
        deploy: DeployUtil.deployToJson(deployData),
        signingPublicKeyHex: publicKey,
        targetPublicKeyHex: publicKey,
      });

      const deployHash = await deploy(signedDeploy);

      if (!deployHash) {
        throw new Error("Deploy hash does not exist");
      }

      return updateTempNft(id, {
        ...params,
        deployHash,
        deployStatus: DeployStatusEnum.PENDING,
        checksum,
      });
    },
    mutationKey: [MutationKeys.CREATE_NFT, publicKey],
  });
};
