import { MutationKeys } from "@mlem-user/enums/mutationKeys";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { addUserToWhitelist } from "..";
import { AddUserToWhiteListParams } from "../types";

export const useAddUserToWhiteList = (
  options?: UseMutationOptions<void, unknown, AddUserToWhiteListParams, unknown>
) => {
  return useMutation({
    ...options,
    mutationFn: (params: AddUserToWhiteListParams) =>
      addUserToWhitelist(params),
    mutationKey: [MutationKeys.CLAIM_NFT_BENEFIT],
  });
};
