import { Config } from '@mlem-admin/config';
import {
  CLKey,
  CLPublicKey,
  CLValueBuilder,
  CasperClient,
  Contracts,
  RuntimeArgs,
} from 'casper-js-sdk';

import { InstallArgs } from './types';
import ContractWasm from './wasm/broker.wasm';

const { Contract } = Contracts;
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
}

export const BrokerClientInstance = new BrokerContract(
  Config.nodeRPCUrl,
  Config.networkName
);
