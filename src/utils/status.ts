import { DeployStatusEnum } from '@/enums';

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
