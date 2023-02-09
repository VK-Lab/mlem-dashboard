import { chainId } from 'wagmi';

export const Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID || chainId.polygonMumbai),
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  metadataBaseUrl: 'https://api.d2egroup.com/v1/nfts',
};
