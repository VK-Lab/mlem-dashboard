import { GetTotalNFTsResponse } from "./types";
import request from "../request";

export const getTotalNFTs = (
  contractAddress: string
): Promise<GetTotalNFTsResponse> => {
  return request.get(`/nft-collections/${contractAddress}/total-nfts`);
};
