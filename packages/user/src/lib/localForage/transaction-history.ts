import { DeployStatusEnum } from "@mlem-user/enums";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { DeployContextEnum } from "@mlem-user/enums/deployContext";
import { StorageKeysEnum } from "@mlem-user/enums/storageKeys";
import { Transaction } from "@mlem-user/types/transaction";

import { BaseStorage } from "./base";

export class TransactionHistoryStorage extends BaseStorage {
  constructor(publicKey: string) {
    super(StorageKeysEnum.TRANSACTION_HISTORIES, publicKey);
  }

  public async pushTransactionHistory(transactionHistory: Transaction) {
    const transactionHistories = await this.getItem<Transaction[]>();

    const newTransactionHistories = [
      ...(transactionHistories || []),
      transactionHistory,
    ];

    await this.setItem(newTransactionHistories);
  }

  public async getTransactionHistories() {
    const transactionHistories = await this.getItem<Transaction[]>();

    return transactionHistories || [];
  }

  public async findPendingTokenTransactionHistory({
    context,
    tokenId,
    tokenAddress,
    action,
  }: {
    context: DeployContextEnum;
    tokenId: string;
    tokenAddress: string;
    action: DeployActionsEnum;
  }) {
    const foundItem = await this.findItem<Transaction>(
      (item: Transaction) =>
        item.context === context &&
        item.args.tokenId === tokenId &&
        item.args.tokenAddress === tokenAddress &&
        item.status === DeployStatusEnum.PENDING &&
        item.action === action
    );

    return foundItem;
  }
}
