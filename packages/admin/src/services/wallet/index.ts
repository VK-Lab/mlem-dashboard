import {
  GetWalletNftsParams,
  GetWalletNftsResponse,
} from '@mlem-admin/services/wallet/types';
import request from '@mlem-admin/utils/request';

export const getMyWalletNfts = (
  params?: GetWalletNftsParams
): Promise<GetWalletNftsResponse> => {
  return request.get('/wallets/me/nfts', {
    params: params,
  });
};
