import { BenefitCategory } from './benefit-category';

export type Benefit = {
  id: string;
  name: string;
  amount?: number;
  description: string;
  categoryId: string;
  category?: BenefitCategory;
  source: string;
  createdAt: string;
};
