import { Config } from '@mlem-admin/config';
import {
  CLKey,
  CLPublicKey,
  CLValueBuilder,
  CasperClient,
  Contracts,
  RuntimeArgs,
} from 'casper-js-sdk';
import { BigNumberish } from 'ethers';

import { InstallArgs } from './types';
import ContractWasm from './wasm/broker.wasm';

const { Contract } = Contracts;

const convertHashStrToHashBuff = (hashStr: string) => {
  let hashHex = hashStr;
  if (hashStr.startsWith('hash-')) {
    hashHex = hashStr.slice(5);
  }
  return Buffer.from(hashHex, 'hex');
};

export class BrokerContract {
  private casperClient: CasperClient;

  public contractClient: Contracts.Contract;

  public contractHashKey!: CLKey;

  constructor(public nodeAddress: string, public networkName: string) {
    this.casperClient = new CasperClient(nodeAddress);
    this.contractClient = new Contract(this.casperClient);
  }

  public async install(
    args: InstallArgs,
    paymentAmount: string,
    deploySender: CLPublicKey
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      id: CLValueBuilder.string(args.id),
      name: CLValueBuilder.string(args.name),
      admins: CLValueBuilder.list([
        CLValueBuilder.byteArray(deploySender.toAccountHash()),
      ]),
      dealer: CLValueBuilder.byteArray(deploySender.toAccountHash()),
      minting_fee: CLValueBuilder.u512(args.mintingFee),
      max_owned_tokens: CLValueBuilder.u64(args.maxOwnedTokens),
    });

    return this.contractClient.install(
      ContractWasm,
      runtimeArgs,
      paymentAmount,
      deploySender,
      this.networkName,
      []
    );
  }

  public setContractHash(contractHash: string, contractPackageHash?: string) {
    this.contractClient.setContractHash(contractHash, contractPackageHash);
    this.contractHashKey = CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(contractHash))
    );
  }

  public setMintingFee(
    args: { amount: BigNumberish },
    paymentAmount: string,
    deploySender: CLPublicKey
  ) {
    const runtimeArgs = RuntimeArgs.fromMap({
      amount: CLValueBuilder.u512(args.amount),
    });

    return this.contractClient.callEntrypoint(
      'set_minting_fee',
      runtimeArgs,
      deploySender,
      this.networkName,
      paymentAmount,
      []
    );
  }
}

export const BrokerClientInstance = new BrokerContract(
  Config.nodeRPCUrl,
  Config.networkName
);
