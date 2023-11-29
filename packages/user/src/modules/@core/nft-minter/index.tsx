"use client";

import { useAccount } from "@casperdash/usewallet";

import { Button } from "@mlem-user/components/ui/button";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { NftCollection } from "@mlem-user/types/nft-collection";

import { useCreateNFT } from "./hooks/use-create-nft";
import { useGetPendingTransaction } from "./hooks/use-get-pending-transaction";
import { ButtonConnect } from "../button-connect";

type NFTMinterProps = {
  nftCollection?: NftCollection;
};

export const NFTMinter = ({ nftCollection }: NFTMinterProps) => {
  const { isPending } = useGetPendingTransaction({
    contractPackageHash: nftCollection?.contractPackageHash,
    action: DeployActionsEnum.MINT,
  });
  const { toast } = useToast();
  const { mutate, isLoading } = useCreateNFT({
    onSuccess: () => {
      toast({
        title: "Deployed your transaction successfully!",
        description: "Waiting for transaction to be mined",
      });
    },
  });

  const handleOnMintClick = () => {
    if (!nftCollection) {
      return;
    }

    mutate(nftCollection);
  };

  const { publicKey } = useAccount();

  if (!nftCollection) {
    return null;
  }

  if (!publicKey) {
    return <ButtonConnect className="px-8 h-12" buttonText="Connect Wallet" />;
  }

  const isMinting = isPending || isLoading;

  return (
    <Button
      className="px-8 h-12"
      isLoading={isMinting}
      onClick={handleOnMintClick}
    >
      {isMinting ? "Minting..." : "Mint Now"}
    </Button>
  );
};
