"use client";

import { useAccount, useSign } from "@casperdash/usewallet";
import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { DeployTypesEnum } from "@mlem-user/enums/deployTypes";
import { MutationKeys } from "@mlem-user/enums/mutationKeys";
import { useAddTransaction } from "@mlem-user/hooks/transaction/use-add-transaction";
import { signDeployNft } from "@mlem-user/lib/cep78/utils";
import { createTempNft, updateTempNft } from "@mlem-user/services/app/nft";
import {
  CreateTempNftParams,
  CreateTempNftResponse,
} from "@mlem-user/services/app/nft/types";
import { deploy } from "@mlem-user/services/app/proxy";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { DeployUtil } from "casper-js-sdk";
import dayjs from "dayjs";
import _pick from "lodash-es/pick";

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
  const { mutateAsync } = useAddTransaction(publicKey!);

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

      const paymentAmount = 5_000_000_000;

      const { deploy: deployData, checksum } = await signDeployNft({
        publicKeyHex: publicKey,
        name: params.name,
        nftId: id,
        tokenAddress: params.tokenAddress,
        paymentAmount: `${5_000_000_000}`,
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

      await mutateAsync({
        fromPublicKeyHex: publicKey!,
        toPublicKeyHex: params.tokenAddress,
        status: DeployStatusEnum.PENDING,
        deployHash: deployHash,
        context: DeployContextEnum.NFT,
        type: DeployTypesEnum.CONTRACT_CALL,
        args: {
          ..._pick(params, ["name", "description", "imageUrl"]),
          nftId: id,
        } as unknown as Record<string, string | number>,
        action: DeployActionsEnum.MINT,
        paymentAmount,
        date: dayjs().toISOString(),
        additionalInfos: _pick(params, [
          "tokenAddress",
          "contractPackageHash",
        ]) as unknown as Record<string, string>,
      });

      const result = await updateTempNft(id, {
        ...params,
        deployHash,
        deployStatus: DeployStatusEnum.PENDING,
        checksum,
      });

      return result;
    },
    mutationKey: [MutationKeys.CREATE_NFT, publicKey],
  });
};
