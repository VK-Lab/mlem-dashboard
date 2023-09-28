import { Claim, ClaimStatusEnum } from '@mlem/admin/types/claim';

export type GetClaimsParams = {
  limit: number;
  page: number;
};

export type GetClaimsResponse = {
  items: Claim[];
  total: number;
};

export type UpdateClaimParams = {
  id: string;
  status: ClaimStatusEnum;
};

export type UpdateClaimStatusResponse = {
  id: string;
};
