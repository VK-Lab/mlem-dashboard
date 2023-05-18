/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CLPublicKey,
  CasperServiceByJsonRPC,
  CasperClient,
  StoredValue,
} from 'casper-js-sdk';
import _ from 'lodash';

import { Config } from '@/config';

export const getAccountInfo = async (
  publicKey: CLPublicKey,
  nodeAddress = Config.nodeRPCUrl
): Promise<StoredValue['Account']> => {
  const client = new CasperServiceByJsonRPC(nodeAddress);
  const stateRootHash = await client.getStateRootHash();
  const accountHash = publicKey.toAccountHashStr();
  const blockState = await client.getBlockState(stateRootHash, accountHash, []);
  return blockState.Account;
};

export const getAccount = async (publicKeyHex: string) => {
  const cliPublicKey = CLPublicKey.fromHex(publicKeyHex);
  const accountInfo = await getAccountInfo(cliPublicKey);

  return accountInfo;
};

/**
 * Returns a value under an on-chain account's storage.
 * @param accountInfo - On-chain account's info.
 * @param namedKey - A named key associated with an on-chain account.
 */
export const getAccountNamedKeyValue = (
  accountInfo: any,
  namedKey: string
): string | undefined => {
  const found = accountInfo.namedKeys.find((i: any) => i.name === namedKey);
  if (found) {
    return found.key;
  }
  return undefined;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDeploy = async (
  deployHash: string,
  nodeURL = Config.nodeRPCUrl
) => {
  await sleep(15000);
  const client = new CasperClient(nodeURL);
  let i = 300;
  while (i !== 0) {
    try {
      const [deploy, raw] = await client.getDeploy(deployHash);
      if (raw.execution_results.length !== 0) {
        if (raw.execution_results[0].result.Success) {
          return deploy;
        } else {
          throw Error(
            'Contract execution: ' +
              _.get(
                raw,
                'execution_results[0].result.Failure.error_message',
                ''
              )
          );
        }
      } else {
        throw new Error('Can not get response');
      }
    } catch (err) {
      i--;
      await sleep(5000);
      continue;
    }
  }
  throw Error('Timeout after ' + i + "s. Something's wrong");
};
