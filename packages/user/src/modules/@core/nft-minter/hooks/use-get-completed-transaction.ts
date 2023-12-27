import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import _get from "lodash-es/get";

import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { useGetTransactions } from "@mlem-user/hooks/transaction/use-get-transactions";
import { Transaction } from "@mlem-user/types/transaction";

type Params = {
  contractPackageHash?: string;
  action: DeployActionsEnum.MINT;
};

export const useGetCompletedTransactions = ({
  contractPackageHash,
  action,
}: Params) => {
  const { publicKey } = useAccount();
  const { data, isLoading } = useGetTransactions(publicKey);

  const foundTransactions = useMemo(() => {
    if (!data || !contractPackageHash) {
      return;
    }

    const transactions = data.filter((transaction: Transaction) => {
      return (
        transaction.action === action &&
        transaction.context === DeployContextEnum.NFT &&
        transaction.status === DeployStatusEnum.COMPLETED &&
        _get(transaction, "additionalInfos.contractPackageHash") ===
          contractPackageHash
      );
    });

    return transactions;
  }, [action, data, contractPackageHash]);

  return {
    transactions: foundTransactions,
    isLoading,
  };
};
