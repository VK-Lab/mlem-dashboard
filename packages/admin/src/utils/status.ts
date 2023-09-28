import { DeployStatusEnum } from '@mlem/admin/enums';

export const mapDeployStatus = (status: DeployStatusEnum) => {
  switch (status) {
    case DeployStatusEnum.COMPLETED:
      return 'success';
    case DeployStatusEnum.FAILED:
      return 'error';
    default:
      return 'warning';
  }
};
