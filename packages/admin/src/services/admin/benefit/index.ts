import request from '@mlem/admin/utils/request';

import {
  CreateBenefitParams,
  CreateBenefitResponse,
  GetBenefitsParams,
  GetBenefitsResponse,
} from './types';

export const getBenefits = (
  params?: GetBenefitsParams
): Promise<GetBenefitsResponse> => {
  return request.get('/admin/benefits', {
    params,
  });
};

export const createBenefit = (
  params: CreateBenefitParams
): Promise<CreateBenefitResponse> => {
  return request.post(`/admin/benefits`, params);
};
