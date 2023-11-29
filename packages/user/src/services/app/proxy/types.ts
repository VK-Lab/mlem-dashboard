import { DeployStatusEnum } from "@mlem-user/enums";

export type GetDeployStatusResponse = {
  deployHash: string;
  status: DeployStatusEnum;
};

export type GetAccountBalanceResponse = {
  balance: number;
};
