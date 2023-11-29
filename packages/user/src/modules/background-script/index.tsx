"use client";

import { useCallback, useEffect } from "react";

import { useAccount } from "@casperdash/usewallet";
import { useQueryClient } from "@tanstack/react-query";
import _map from "lodash-es/map";

import { Config } from "@mlem-user/config";
import { DeployStatusEnum } from "@mlem-user/enums";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { TransactionHistoryStorage } from "@mlem-user/lib/localForage/transaction-history";
import { Transaction } from "@mlem-user/types/transaction";

import { Message, useEventSource } from "./hooks/use-event-source";

const BackgroundScript = () => {
  const queryClient = useQueryClient();

  const { publicKey } = useAccount();
  const handleOnMessage = useCallback(
    async (event: Message) => {
      if (!publicKey) {
        console.log("publicKey is not available");
        return;
      }
      const { data } = event;
      try {
        const { deployHash, status } = JSON.parse(data);
        const transactionHistoryStorage = new TransactionHistoryStorage(
          publicKey
        );

        const transactionHistories =
          await transactionHistoryStorage.getTransactionHistories();
        const pendingTransactionHistories = transactionHistories.filter(
          (transactionHistory: Transaction) =>
            transactionHistory.status === DeployStatusEnum.PENDING
        );

        if (pendingTransactionHistories.length === 0) {
          return;
        }

        const mappedTxHistories = _map(
          transactionHistories,
          (txHistory: Transaction) => {
            if (txHistory.deployHash !== deployHash) {
              return txHistory;
            }

            return {
              ...txHistory,
              status,
            };
          }
        );

        await queryClient.invalidateQueries([QueryKeys.LIST_NFTS]);

        await transactionHistoryStorage.setItem(mappedTxHistories);
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [publicKey]
  );

  const { connectionStatus, openStream, closeStream } = useEventSource(
    Config.sseBaseUrl,
    handleOnMessage
  );

  useEffect(() => {
    if (publicKey && connectionStatus !== "connected") {
      closeStream();
      openStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, connectionStatus]);

  return null;
};

export default BackgroundScript;
