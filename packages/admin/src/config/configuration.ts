export const Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.melem.io/v1',
  metadataBaseUrl:
    process.env.NEXT_PUBLIC_METADATA_BASE_URL || 'https://api.melem.io/v1/nfts',
  nodeRPCUrl: '/rpc',
  casperDashUrl:
    process.env.NEXT_PUBLIC_CASPERDASH_API_URL || 'https://api.casperdash.io',
  networkName: process.env.NEXT_PUBLIC_CASPER_NETWORK || 'casper',
  cep78: {
    contractWASM:
      'https://s3.ap-southeast-1.amazonaws.com/assets.melem.io/contracts/contract.wasm',
    mintCallWASM:
      'https://d2e-dev.s3.ap-southeast-1.amazonaws.com/cep78/mint_call.wasm',
    transferCallWASM:
      'https://s3.ap-southeast-1.amazonaws.com/assets.melem.io/contracts/transfer_call.wasm',
  },
};
