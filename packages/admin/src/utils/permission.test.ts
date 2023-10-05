import { RoleEnum, User } from '@mlem-admin/types/user';
import { describe, expect, it } from 'vitest';

import { isAdmin } from './permission';

describe('isAdmin', () => {
  it('should return true if the user has the ADMIN role', () => {
    const user = {
      roles: [RoleEnum.ADMIN],
    } as User;

    const result = isAdmin(user);

    expect(result).toBe(true);
  });

  it('should return false if the user does not have the ADMIN role', () => {
    const user = {
      roles: [RoleEnum.USER],
    } as User;

    const result = isAdmin(user);

    expect(result).toBe(false);
  });

  it('should return false if the user roles array is empty', () => {
    const user: User = {
      roles: [],
    } as unknown as User;

    const result = isAdmin(user);

    expect(result).toBe(false);
  });
});
