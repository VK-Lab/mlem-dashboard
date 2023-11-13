import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import { Button, ButtonLoading } from "@mlem-user/components/ui/button";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { ButtonConnect } from "@mlem-user/modules/user/user-header/components/button-connect";
import { useGetNFTs } from "@mlem-user/services/app/nft/hooks/useGetNFTs";
import { CreateTempNftParams } from "@mlem-user/services/app/nft/types";

import { useCreateNFT } from "./hooks/use-create-nft";
import { useGetPendingTransaction } from "./hooks/use-get-pending-transaction";

type Props = {
  params: CreateTempNftParams;
};

export const ButtonMint = ({ params }: Props) => {
  const { toast } = useToast();
  const { mutate, isLoading } = useCreateNFT({
    onSuccess: () => {
      toast({
        title: "Deployed your transaction successfully!",
        description: "Waiting for transaction to be mined",
      });
    },
  });
  const { isPending } = useGetPendingTransaction({
    contractPackageHash: params.contractPackageHash,
    action: DeployActionsEnum.MINT,
  });

  const { publicKey } = useAccount();
  const { data: nfts = [], isLoading: isLoadingNfts } = useGetNFTs();

  const handleOnMintClick = () => {
    if (!params) {
      return;
    }

    mutate(params);
  };

  const isOwned = useMemo(() => {
    return nfts.some((nft) => nft.tokenAddress === params.tokenAddress);
  }, [nfts, params]);

  if (!publicKey) {
    return <ButtonConnect />;
  }

  if (isLoadingNfts) {
    return <ButtonLoading>Loading</ButtonLoading>;
  }

  if (isOwned) {
    return <Button disabled>Owned</Button>;
  }

  const isMinting = isPending || isLoading;

  return (
    <>
      {!isMinting && <Button onClick={handleOnMintClick}>Mint</Button>}
      {isMinting && <ButtonLoading>Mintting</ButtonLoading>}
    </>
  );
};
