import { DeployStatusEnum } from '@mlem-admin/enums';
import { NftTypeEnum } from '@mlem-admin/enums/nftType.enum';
import { Nft } from '@mlem-admin/types/nft';

export type GetNftsParams = {
  limit: number;
  page: number;
};

export type GetNftsResponse = {
  items: Nft[];
  total: number;
};

export type UpdateNftParams = {
  id: string;
  name?: string;
  description?: string;
  benefits?: string[];
  deployHash?: string;
  checksum?: string;
  deployStatus?: DeployStatusEnum;
  type?: NftTypeEnum;
  tierId?: string;
};

export type UpdateNftResponse = {
  id: string;
};

export type CreateNftParams = Partial<Omit<Nft, 'benefits' | 'claims'>> & {
  benefits?: string[];
  tokenAddress?: string;
  tokenId?: string;
  name: string;
  imageUrl: string;
  deployHash?: string;
  contractPackageHash?: string;
  deployStatus?: DeployStatusEnum;
};

export type CreateNftResponse = {
  id: string;
};

export type BatchCreateNftsParams = {
  nfts: CreateNftParams[];
};

export type BatchCreateNftsResponse = CreateNftResponse[];
