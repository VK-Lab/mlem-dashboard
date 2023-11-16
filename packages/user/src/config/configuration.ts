export const Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.melem.io/v1",
  sseBaseUrl: process.env.NEXT_PUBLIC_SSE_URL || "https://api.melem.io/v1/sse",
  networkName: process.env.NEXT_PUBLIC_CASPER_NETWORK || "casper",
  metadataBaseUrl:
    process.env.NEXT_PUBLIC_METADATA_BASE_URL || "https://api.melem.io/v1/nfts",
  casperDashBaseUrl:
    process.env.NEXT_PUBLIC_CASPERDASH_API_URL ||
    "https://api.casperdash.com/v1",
  campaignerUrl:
    process.env.NEXT_PUBLIC_CAMPAIGNER_URL || "https://campaigner.melem.io",
};
