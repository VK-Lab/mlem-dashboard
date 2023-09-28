import { BenefitCategory } from '@mlem/admin/types/benefit-category';

export type GetBenefitCategoriesParams = {
  limit: number;
  page: number;
};

export type GetBenefitCategoriesResponse = {
  items: BenefitCategory[];
  total: number;
};

export type CreateBenefitCategoryParams = {
  name: string;
};

export type CreateBenefitCategoryResponse = BenefitCategory;
