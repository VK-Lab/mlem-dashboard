import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { TransactionHistoryStorage } from "@mlem-user/lib/localForage/transaction-history";
import { Transaction } from "@mlem-user/types/transaction";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export type Variables = Transaction;

export const useAddTransaction = (
  fromPublicKeyHex?: string,
  options?: UseMutationOptions<void, unknown, Variables, unknown>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    mutationFn: async (variables: Variables) => {
      const newTransactionHistory = {
        ...variables,
      };

      const transactionStorage = new TransactionHistoryStorage(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        fromPublicKeyHex!
      );

      await transactionStorage.pushTransactionHistory(newTransactionHistory);

      await queryClient.invalidateQueries([
        QueryKeys.TRANSACTIONS,
        fromPublicKeyHex,
      ]);
    },
  });
};
