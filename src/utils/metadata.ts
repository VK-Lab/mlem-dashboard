import urlJoin from 'url-join';

import { Config } from '@/config';

export const generateMetadataUrl = (nftId: string) => {
  return urlJoin(Config.metadataBaseUrl, nftId, 'metadata');
};
