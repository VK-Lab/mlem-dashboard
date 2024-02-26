export enum PrivatePaths {
  USER_COLLECTION = '/user',
  NFT_DETAIL = '/nfts/[tokenAddress]',
}

export enum AdminPaths {
  DASHBOARD = '/adm/campaigns',
  LIST_CAMPAIGNS = '/adm/campaigns',
  LIST_NFT_COLLECTIONS = '/adm/nft-collections',
  LIST_BROKERS = '/adm/brokers',
  LIST_NFT_MINTS = '/adm/nft-mints',
  LIST_BENEFITS = '/adm/benefits',
  LIST_BENEFIT_CATEGORIES = '/adm/benefit-categories',
  LIST_CLAIMS = '/adm/claims',
  CREATE_CAMPAIGN_STEP_BENEFIT = '/adm/campaign/create/benefit',
  CREATE_CAMPAIGN_STEP_NFT_COLLECTION = '/adm/campaign/create/nft-collection',
  CREATE_CAMPAIGN = '/adm/campaign/create',

  CLAIMS = '/admin/claims',
  BENEFITS = '/admin/benefits',
  BENEFIT_CATEGORIES = '/admin/benefit-categories',
  CAMPAIGNS = '/admin/campaigns',
  NFTS = '/admin/nfts',
  NFT_COLLECTIONS = '/admin/nft-collections',
  BROKERS = '/admin/brokers',
}

export enum PublicPaths {
  AUTH_WALLET = '/auth-wallet',
  WELCOME = '/welcome',
  ADMIN = '/admin',
  HOME = '/',
}

export const Paths = {
  ...PrivatePaths,
  ...PublicPaths,
};

export type Paths = PrivatePaths | PublicPaths | AdminPaths;
