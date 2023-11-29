import { DeployStatusEnum } from "@mlem-user/enums";

import { Benefit } from "./benefit";
import { ClaimStatusEnum } from "./claim";
import { NftCollection } from "./nft-collection";
import { Tier } from "./tier";

export type NftMetadata = {
  name: string;
  description: string;
  image: string;
  external_url: string;
  background_color: string;
};

export type NFT = {
  _id: string;
  tokenHash: string;
  benefits: Benefit[];
  claims: NftClaim[];
  createdAt: string;
  description: string;
  imageUrl: string;
  name: string;
  tokenAddress: string;
  contractPackageHash: string;
  tokenId: string;
  updatedAt: string;
  contractType: string;
  id: string;
  tierId?: string;
  ownerOf: string;
  deployStatus: DeployStatusEnum;
  deployHash: string;
  nftCollection: Partial<NftCollection>;
  tier?: Tier;
};

export type NftClaim = {
  benefitId: string;
  status: ClaimStatusEnum;
  generatedCode?: string;
};

export type EvmNft = {
  tokenAddress: string;
  tokenId: string;
  contractType: string;
  ownerOf: string;
  blockNumber: string;
  blockNumberMinted: string;
  tokenUri?: string | undefined;
  metadata?: NftMetadata;
  amount?: string | undefined;
  name: string;
  symbol: string;
  tokenHash: string;
  lastTokenUriSync: string;
  lastMetadataSync: string;
};
