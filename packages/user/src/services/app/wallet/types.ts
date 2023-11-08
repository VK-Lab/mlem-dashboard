import { NFT } from "@mlem-user/types/nft";

export type GetWalletNftsResponse = {
  total: number;
  page: number;
  page_size: number;
  cursor: string;
  result: NFT[];
};

export type GetWalletNftsParams = {
  cursor: string;
  limit: number;
};
