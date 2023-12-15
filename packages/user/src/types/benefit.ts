import { BenefitCategory } from "./benefit-category";
import { ClaimStatusEnum } from "./claim";

export type Benefit = {
  id: string;
  name: string;
  amount?: number;
  description: string;
  categoryId: string;
  category?: BenefitCategory;
  generatedCode?: string;
  status: ClaimStatusEnum;
};
