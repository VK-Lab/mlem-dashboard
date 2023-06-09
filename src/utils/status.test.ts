import { describe, expect, it } from 'vitest';

import { mapDeployStatus } from './status';
import { DeployStatusEnum } from '@/enums';

describe('mapDeployStatus', () => {
  it('should return "success" when status is DeployStatusEnum.COMPLETED', () => {
    const status = DeployStatusEnum.COMPLETED;

    const result = mapDeployStatus(status);

    expect(result).toBe('success');
  });

  it('should return "error" when status is DeployStatusEnum.FAILED', () => {
    const status = DeployStatusEnum.FAILED;

    const result = mapDeployStatus(status);

    expect(result).toBe('error');
  });

  it('should return "warning" for any other status', () => {
    const status = 'some-other-status';

    const result = mapDeployStatus(status as DeployStatusEnum);

    expect(result).toBe('warning');
  });
});
