import { RoleEnum, User } from '@mlem-admin/types/user';

export const isAdmin = (user: User) => {
  return (
    (user.roles && user.roles.includes(RoleEnum.ADMIN)) ||
    (user.roles && user.roles.includes(RoleEnum.USER))
  );
};
