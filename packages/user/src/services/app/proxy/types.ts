import { DeployStatusEnum } from "@mlem-user/enums";

export type GetDeployStatusResponse = {
  deployHash: string;
  status: DeployStatusEnum;
};
