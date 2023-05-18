export const Config = {
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.melem.io/v1',
  metadataBaseUrl: 'http://localhost:4000/v1/nfts',
  nodeRPCUrl: '/rpc',
  casperDashUrl: 'https://testnet-api.casperdash.io',
  networkName: 'casper-test',
  cep78: {
    contractWASM:
      'https://d2e-dev.s3.ap-southeast-1.amazonaws.com/cep78/contract.wasm',
    mintCallWASM:
      'https://d2e-dev.s3.ap-southeast-1.amazonaws.com/cep78/mint_call.wasm',
    transferCallWASM:
      'https://d2e-dev.s3.ap-southeast-1.amazonaws.com/cep78/transfer_call.wasm',
  },
};
