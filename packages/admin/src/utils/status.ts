import { DeployStatusEnum } from '@mlem-admin/enums';

export const mapDeployStatus = (status: string) => {
  switch (status) {
    case DeployStatusEnum.COMPLETED:
      return 'success';
    case DeployStatusEnum.FAILED:
      return 'error';
    case DeployStatusEnum.CONFIRMING:
      return 'confirming';
    case DeployStatusEnum.WARNING:
      return 'warning';
    default:
      return 'warning';
  }
};
