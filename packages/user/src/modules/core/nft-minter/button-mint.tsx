import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import { Button, ButtonLoading } from "@mlem-user/components/ui/button";
import { useGetNFTs } from "@mlem-user/services/nft/hooks/useGetNFTs";
import { CreateTempNftParams } from "@mlem-user/services/nft/types";

import { useCreateNFT } from "./use-create-nft";

type Props = {
  params: CreateTempNftParams;
};

export const ButtonMint = ({ params }: Props) => {
  const { mutate, isLoading } = useCreateNFT();
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

  if (isLoadingNfts) {
    return <ButtonLoading>Loading</ButtonLoading>;
  }

  if (!publicKey) {
    return null;
  }

  if (isOwned) {
    return <Button disabled>Owned</Button>;
  }

  return (
    <>
      {!isLoading && <Button onClick={handleOnMintClick}>Mint</Button>}
      {isLoading && <ButtonLoading>Mintting</ButtonLoading>}
    </>
  );
};
