import request from '@mlem/admin/utils/request';

import { GetMyProfileResponse } from './types';

export const getMyProfile = (): Promise<GetMyProfileResponse> => {
  return request.get('/users/me/profile');
};
