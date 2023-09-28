import { Config } from '@mlem/admin/config';
import urlJoin from 'url-join';

export const generateMetadataUrl = (nftId: string) => {
  return urlJoin(Config.metadataBaseUrl, nftId, 'metadata');
};
