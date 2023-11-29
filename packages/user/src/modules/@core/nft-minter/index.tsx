"use client";

import { useAccount } from "@casperdash/usewallet";

import { Button } from "@mlem-user/components/ui/button";
import { Skeleton } from "@mlem-user/components/ui/skeleton";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { useGetNFTs } from "@mlem-user/services/app/nft/hooks/useGetNFTs";
import { useGetAccountBalance } from "@mlem-user/services/app/proxy/hooks/useGetAccountBalance";
import { NftCollection } from "@mlem-user/types/nft-collection";

import { useCreateNFT } from "./hooks/use-create-nft";
import { useGetPendingTransaction } from "./hooks/use-get-pending-transaction";
import { ButtonConnect } from "../button-connect";

type NFTMinterProps = {
  nftCollection?: NftCollection;
};

export const NFTMinter = ({ nftCollection }: NFTMinterProps) => {
  const { publicKey } = useAccount();
  const { isPending } = useGetPendingTransaction({
    contractPackageHash: nftCollection?.contractPackageHash,
    action: DeployActionsEnum.MINT,
  });
  const { data, isLoading: isLoadingBalance } = useGetAccountBalance({
    publicKey,
  });
  const { data: nfts = [] } = useGetNFTs();
  const { toast } = useToast();
  const { mutate, isLoading } = useCreateNFT({
    onSuccess: () => {
      toast({
        title: "Deployed your transaction successfully!",
        description: "Waiting for transaction to be mined",
      });
    },
  });

  const maxOwnedTokens = nftCollection?.broker?.maxOwnedTokens || 0;
  const mintingFee = nftCollection?.broker?.mintingFee || 0;
  const filteredNFTs = nfts?.filter(
    (nft) => nft.tokenAddress === nftCollection?.tokenAddress
  );

  const handleOnMintClick = () => {
    if (!nftCollection) {
      return;
    }

    mutate(nftCollection);
  };

  const isMinting = isPending || isLoading;

  if (isLoadingBalance) {
    return (
      <div>
        <Skeleton className="h-12 w-[250px]" />
      </div>
    );
  }

  if (!nftCollection) {
    return null;
  }

  const totalFee = mintingFee + 20;
  if ((data?.balance || 0) < totalFee) {
    return (
      <div className="h-12">
        You need at least {totalFee} CSPR to mint this NFT
      </div>
    );
  }

  if (!publicKey) {
    return <ButtonConnect className="px-8 h-12" buttonText="Connect Wallet" />;
  }

  if (maxOwnedTokens && filteredNFTs?.length >= maxOwnedTokens) {
    return (
      <div className=" h-12">You have reached the maximum number of tokens</div>
    );
  }

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
