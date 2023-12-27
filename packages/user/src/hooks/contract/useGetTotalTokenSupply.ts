import { BigNumber } from "@ethersproject/bignumber";
import { useQuery } from "@tanstack/react-query";
import { CasperClient } from "casper-js-sdk";

import { Config } from "@mlem-user/config";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { CEP78Client } from "@mlem-user/lib/cep78";

export const useGetTotalTokenSupply = (contractHash?: string) => {
  return useQuery(
    [QueryKeys.TOTAL_TOKEN_SUPPLY, contractHash],
    async () => {
      if (!contractHash) {
        return 0;
      }

      const casperClient = new CasperClient(`${Config.apiBaseUrl}/proxies`);
      const contract = new CEP78Client(Config.networkName, casperClient);
      contract.setContractHash(contractHash);
      const totalTokenSupply = await contract.numOfMintedTokens();
      return BigNumber.from(totalTokenSupply).toNumber();
    },
    { enabled: !!contractHash }
  );
};
