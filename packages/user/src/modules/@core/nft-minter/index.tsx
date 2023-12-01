"use client";

import { useAccount } from "@casperdash/usewallet";

import { Button } from "@mlem-user/components/ui/button";
import { Skeleton } from "@mlem-user/components/ui/skeleton";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { useCheckUserInWhiteList } from "@mlem-user/services/app/campaign/hooks/useCheckUserInWhiteList";
import { useGetNFTs } from "@mlem-user/services/app/nft/hooks/useGetNFTs";
import { useGetAccountBalance } from "@mlem-user/services/app/proxy/hooks/useGetAccountBalance";
import { NftCollection } from "@mlem-user/types/nft-collection";

import { useCreateNFT } from "./hooks/use-create-nft";
import { useGetCompletedTransactions } from "./hooks/use-get-completed-transaction";
import { useGetPendingTransaction } from "./hooks/use-get-pending-transaction";

type NFTMinterProps = {
  nftCollection?: NftCollection;
  isAllowWhitelistUser?: boolean;
  campaignId: string;
};

export const NFTMinter = ({
  nftCollection,
  campaignId,
  isAllowWhitelistUser,
}: NFTMinterProps) => {
  const { publicKey } = useAccount();
  const { isPending } = useGetPendingTransaction({
    contractPackageHash: nftCollection?.contractPackageHash,
    action: DeployActionsEnum.MINT,
  });
  const {
    transactions: completedTransactions = [],
    isLoading: isLoadingCompletedTransactions,
  } = useGetCompletedTransactions({
    contractPackageHash: nftCollection?.contractPackageHash,
    action: DeployActionsEnum.MINT,
  });

  const { data, isLoading: isLoadingBalance } = useGetAccountBalance({
    publicKey,
  });
  const { data: whitelistChecked, isLoading: isLoadingWhitelist } =
    useCheckUserInWhiteList({
      campaignId,
      publicKey: publicKey!,
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
    (nft) => nft.contractPackageHash === nftCollection?.contractPackageHash
  );

  const handleOnMintClick = () => {
    if (!nftCollection) {
      return;
    }

    mutate({
      name: nftCollection.name,
      description: nftCollection.description,
      tokenAddress: nftCollection.tokenAddress,
      imageUrl: nftCollection.nftImageUrl,
      contractPackageHash: nftCollection.contractPackageHash,
      broker: nftCollection.broker,
    });
  };

  const isMinting = isPending || isLoading;

  if (
    isLoadingBalance ||
    isLoadingWhitelist ||
    isLoadingCompletedTransactions
  ) {
    return (
      <div>
        <Skeleton className="h-[72px] w-[160px]" />
      </div>
    );
  }

  if (!nftCollection) {
    return null;
  }

  const totalFee = mintingFee + 20;
  if ((data?.balance || 0) < totalFee) {
    return (
      <div className="h-[72px]">
        To mint this NFT, you require {totalFee} CSPR in your balance.
      </div>
    );
  }

  if (isAllowWhitelistUser) {
    if (
      !whitelistChecked ||
      whitelistChecked?.isInvalid ||
      !whitelistChecked?.isExisted
    ) {
      return (
        <div className=" h-12">
          You are currently ineligible to mint NFTs in the Whitelisted Round.
          Please return during the public round scheduled from December 3rd to
          December 4th, 2023.
        </div>
      );
    }
  }

  if (
    maxOwnedTokens &&
    (filteredNFTs?.length >= maxOwnedTokens ||
      completedTransactions?.length >= maxOwnedTokens)
  ) {
    return (
      <div className=" h-12">
        Jes ser! You&apos;ve officially become a Jasperian. Your wallet has
        already hit the maximum entry limit.
      </div>
    );
  }

  return (
    <div className="w-[180px]">
      <Button
        className="px-8 h-12 min-w-[160px]"
        isLoading={isMinting}
        onClick={handleOnMintClick}
      >
        {isMinting ? "Minting..." : "Mint Now"}
      </Button>
      <p className="mt-2 text-xs">Estimated network Fee: 20 CSPR</p>
    </div>
  );
};
