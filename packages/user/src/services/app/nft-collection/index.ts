import { GetTotalNFTsResponse } from "./types";
import request from "../request";

export const getTotalNFTs = (
  contractPackageHash: string
): Promise<GetTotalNFTsResponse> => {
  return request.get(`/nft-collections/${contractPackageHash}/total-nfts`);
};
