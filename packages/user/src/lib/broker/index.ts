import {
  CLKey,
  CLPublicKey,
  CLValueBuilder,
  Contracts,
  RuntimeArgs,
} from "casper-js-sdk";

import { Config } from "@mlem-user/config";

import { MintArgs } from "./types";
import MintWasm from "./wasm/mint_fee.wasm";

const convertHashStrToHashBuff = (hashStr: string) => {
  let hashHex = hashStr;
  if (hashStr.startsWith("hash-")) {
    hashHex = hashStr.slice(5);
  }
  return Buffer.from(hashHex, "hex");
};

const { Contract } = Contracts;
export class BrokerContract {
  public contractClient: Contracts.Contract;

  public contractHashKey!: CLKey;

  constructor(public networkName: string) {
    this.contractClient = new Contract();
  }

  public setContractHash(contractHash: string, contractPackageHash?: string) {
    this.contractClient.setContractHash(contractHash, contractPackageHash);
    this.contractHashKey = CLValueBuilder.key(
      CLValueBuilder.byteArray(convertHashStrToHashBuff(contractHash))
    );
  }

  public mint(args: MintArgs, deploySender: CLPublicKey, wasm?: Uint8Array) {
    if (!this.contractHashKey) {
      throw new Error("Contract hash not set");
    }

    const wasmToCall = wasm || MintWasm;

    const runtimeArgs = RuntimeArgs.fromMap({
      token: CLValueBuilder.key(
        CLValueBuilder.byteArray(convertHashStrToHashBuff(args.token))
      ),
      token_owner: CLValueBuilder.key(deploySender),
      token_meta_data: CLValueBuilder.string(JSON.stringify(args.meta)),
      amount: CLValueBuilder.u512(args.amount),
      broker: this.contractHashKey,
    });

    const preparedDeploy = this.contractClient.install(
      wasmToCall,
      runtimeArgs,
      `${25_000_000_000}`,
      deploySender,
      this.networkName
    );

    return preparedDeploy;
  }
}

export const BrokerClientInstance = new BrokerContract(Config.networkName);
