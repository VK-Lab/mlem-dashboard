import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import _map from "lodash-es/map";

import { DeployStatusEnum } from "@mlem-user/enums";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { TransactionHistoryStorage } from "@mlem-user/lib/localForage/transaction-history";
import { getDeployStatus } from "@mlem-user/services/app/proxy";
import { Transaction } from "@mlem-user/types/transaction";

export const useGetTransactions = (
  publicKey?: string | null,
  options?: Omit<
    UseQueryOptions<
      unknown,
      unknown,
      Transaction[],
      [QueryKeys.TRANSACTIONS, string | undefined | null]
    >,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  const queryClient = useQueryClient();
  return useQuery(
    [QueryKeys.TRANSACTIONS, publicKey],
    async () => {
      if (!publicKey) {
        return [];
      }
      const transactionHistoryStorage = new TransactionHistoryStorage(
        publicKey
      );
      const transactionHistories =
        await transactionHistoryStorage.getTransactionHistories();
      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: Transaction) =>
          transactionHistory.status === DeployStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _map(pendingTransactionHistories, "deployHash");
        const promisesMappedTxHistories = transactionHistories.map(
          async (transactionHistory: Transaction) => {
            if (!deployHashes.includes(transactionHistory.deployHash)) {
              return transactionHistory;
            }

            const deployStatus = await getDeployStatus(
              transactionHistory.deployHash
            );

            return {
              ...transactionHistory,
              status: deployStatus.status,
            };
          }
        );
        const mappedTxHistories = await Promise.all(promisesMappedTxHistories);

        await queryClient.invalidateQueries([QueryKeys.LIST_NFTS]);

        await transactionHistoryStorage.setItem(mappedTxHistories);

        return mappedTxHistories;
      }

      return transactionHistories;
    },
    {
      ...options,
      enabled: !!publicKey,
      refetchInterval: 6 * 1000,
      refetchIntervalInBackground: true,
    }
  );
};
