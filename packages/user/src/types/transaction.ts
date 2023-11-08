import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { DeployTypesEnum } from "@mlem-user/enums/deployTypes";

export type Transaction = {
  action: DeployActionsEnum;
  fromPublicKeyHex: string;
  toPublicKeyHex?: string;
  type: DeployTypesEnum;
  paymentAmount: number;
  args: Record<string, string | number>;
  status: DeployStatusEnum;
  date: string;
  entryPoint?: string;
  context: DeployContextEnum;
  deployHash: string;
  additionalInfos?: Record<string, string>;
};
