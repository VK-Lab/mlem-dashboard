import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { TransactionHistoryStorage } from "@mlem-user/lib/localForage/transaction-history";
import { getDeployStatuses } from "@mlem-user/services/casperdash/deploysStatus/deploysStatus.service";
import { DeployStatus } from "@mlem-user/services/casperdash/deploysStatus/type";
import { Transaction } from "@mlem-user/types/transaction";
import {
  UseQueryOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import _map from "lodash-es/map";

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
  const clientQuery = useQueryClient();
  return useQuery(
    [QueryKeys.TRANSACTIONS, publicKey],
    async () => {
      const transactionHistoryStorage = new TransactionHistoryStorage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        publicKey!
      );
      const transactionHistories =
        await transactionHistoryStorage.getTransactionHistories();
      const pendingTransactionHistories = transactionHistories.filter(
        (transactionHistory: Transaction) =>
          transactionHistory.status === DeployStatusEnum.PENDING
      );

      if (pendingTransactionHistories.length > 0) {
        const deployHashes = _map(pendingTransactionHistories, "deployHash");
        const deployStatuses = await getDeployStatuses({
          deployHash: deployHashes,
        });

        let trackingUpdatedDeploys: Transaction[] = [];

        const mappedTxHistories = _map(
          transactionHistories,
          (txHistory: Transaction) => {
            const foundDeployStatus = deployStatuses.find(
              (deployStatus: DeployStatus) =>
                deployStatus.hash.toLowerCase() ===
                txHistory.deployHash.toLowerCase()
            );

            if (!foundDeployStatus) {
              return txHistory;
            }

            const status = foundDeployStatus.status.toLowerCase();
            if (status !== DeployStatusEnum.PENDING) {
              trackingUpdatedDeploys = [...trackingUpdatedDeploys, txHistory];
            }

            return {
              ...txHistory,
              status,
            };
          }
        );

        await transactionHistoryStorage.setItem(mappedTxHistories);

        const isUpdatedMarketNFTs = trackingUpdatedDeploys.some(
          (trackingUpdatedDeploy: Transaction) =>
            trackingUpdatedDeploy.context === DeployContextEnum.NFT
        );

        if (isUpdatedMarketNFTs) {
          await clientQuery.invalidateQueries();
          clientQuery.getQueryCache().clear();
        }

        return mappedTxHistories;
      }

      return transactionHistories;
    },
    {
      ...options,
      enabled: !!publicKey,
    }
  );
};
