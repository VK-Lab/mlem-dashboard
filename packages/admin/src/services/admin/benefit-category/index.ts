import request from '@mlem/admin/utils/request';

import {
  CreateBenefitCategoryParams,
  CreateBenefitCategoryResponse,
  GetBenefitCategoriesParams,
  GetBenefitCategoriesResponse,
} from './types';

const PATH = '/admin/benefit-categories';

export const getBenefitCategories = (
  params?: GetBenefitCategoriesParams
): Promise<GetBenefitCategoriesResponse> => {
  return request.get(PATH, {
    params,
  });
};

export const createBenefitCategory = (
  params: CreateBenefitCategoryParams
): Promise<CreateBenefitCategoryResponse> => {
  return request.post(PATH, params);
};

export * from './types';
