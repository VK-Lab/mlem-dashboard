import { GetWalletNftsParams, GetWalletNftsResponse } from "./types";
import request from "../request";

export const getMyWalletNfts = (
  params?: GetWalletNftsParams
): Promise<GetWalletNftsResponse> => {
  return request.get("/wallets/me/nfts", {
    params: params,
  });
};
