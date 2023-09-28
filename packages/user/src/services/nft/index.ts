import { NFT } from "@mlem-user/types/nft";

import { ClaimNftBenefitParams, ClaimNftBenefitResponse } from "./types";
import request from "../request";

export const getNft = (
  contractAddress: string,
  tokenId: string
): Promise<NFT> => {
  return request.get(`/nfts/${contractAddress}/${tokenId}`);
};

export const getNfts = (): Promise<NFT[]> => {
  return request.get(`/nfts`);
};

export const claimNftBenefit = ({
  nftId,
  benefitId,
}: ClaimNftBenefitParams): Promise<ClaimNftBenefitResponse> => {
  return request.post(`/nfts/${nftId}/benefits/${benefitId}/claim`);
};
