export enum PrivatePaths {
  USER_COLLECTION = '/user',
  NFT_DETAIL = '/nfts/[tokenAddress]',
}

export enum AdminPaths {
  DASHBOARD = '/admin/campaigns',
  CLAIMS = '/admin/claims',
  BENEFITS = '/admin/benefits',
  BENEFIT_CATEGORIES = '/admin/benefit-categories',
  CAMPAIGNS = '/admin/campaigns',
  CREATE_CAMPAIGN = '/admin/campaigns/create',
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
