import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { Transaction } from "@mlem-user/types/transaction";
import _get from "lodash-es/get";

import { useGetTransactions } from "../../../../hooks/transaction/use-get-transactions";

type Params = {
  contractPackageHash?: string;
  action: DeployActionsEnum.MINT;
};

export const useGetPendingTransaction = ({
  contractPackageHash,
  action,
}: Params) => {
  const { publicKey } = useAccount();
  const { data, isLoading } = useGetTransactions(publicKey);

  const foundTransaction = useMemo(() => {
    if (!data || !contractPackageHash) {
      return;
    }

    const foundItem = data.find((transaction: Transaction) => {
      return (
        transaction.action === action &&
        transaction.context === DeployContextEnum.NFT &&
        transaction.status === DeployStatusEnum.PENDING &&
        _get(transaction, "additionalInfos.contractPackageHash") ===
          contractPackageHash
      );
    });

    return foundItem;
  }, [action, data, contractPackageHash]);

  return {
    transaction: foundTransaction,
    isPending: !!foundTransaction,
    isLoading,
  };
};
