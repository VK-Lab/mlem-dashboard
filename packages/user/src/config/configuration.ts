export const Config = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_URL || "https://testnet-api.melem.io/v1",
  networkName: process.env.NEXT_PUBLIC_CASPER_NETWORK || "casper-test",
  metadataBaseUrl:
    process.env.NEXT_PUBLIC_METADATA_BASE_URL || "https://api.melem.io/v1/nfts",
};
