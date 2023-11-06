import { DeployStatusEnum } from "@mlem-user/enums";

export type GetNftParams = {
  tokenId: string;
};

export type ClaimNftBenefitParams = {
  nftId: string;
  benefitId: string;
};

export type ClaimNftBenefitResponse = {
  id: string;
};

export type CreateTempNftParams = {
  name: string;
  description: string;
  tokenAddress: string;
  imageUrl?: string;
  contractPackageHash: string;
  checksum?: string;
  benefits?: string[];
};

export type CreateTempNftResponse = {
  id: string;
};

export type UpdateTempNftParams = Partial<CreateTempNftParams> & {
  deployHash?: string;
  deployStatus?: DeployStatusEnum;
};

export type UpdateTempNftResponse = {
  id: string;
};
