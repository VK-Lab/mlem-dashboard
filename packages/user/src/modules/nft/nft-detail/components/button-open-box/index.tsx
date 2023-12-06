import { useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import Confetti from "react-confetti";

import { Button } from "@mlem-user/components/ui/button";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import useWindowSize from "@mlem-user/hooks/use-window-size";
import { useOpenNFTLuckyBox } from "@mlem-user/services/app/nft/hooks/useOpenNFTLuckyBox";

type Props = {
  contractPackageHash: string;
  tokenId: string;
  isLuckyBox?: boolean;
};
export const ButtonOpenBox = ({
  contractPackageHash,
  tokenId,
  isLuckyBox,
}: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isComplete, setIsComplete] = useState(false);
  const { width, height } = useWindowSize();
  const [isExploding, setIsExploding] = useState(false);
  const { mutate, isLoading } = useOpenNFTLuckyBox({
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        QueryKeys.NFT,
        contractPackageHash,
        tokenId,
      ]);
      toast({
        title: "🎊 Congratulations",
        description: "🌟 Bravo! Your NFT character has arrived! 🎉",
      });
      setIsExploding(true);

      setTimeout(() => {
        setIsComplete(true);
      }, 8000);
    },
  });

  const handleOnClaim = () => {
    mutate({
      contractPackageHash,
      tokenId,
    });
  };

  return (
    <>
      {isLuckyBox && (
        <Button
          className="w-full"
          onClick={handleOnClaim}
          isLoading={isLoading}
        >
          Reveal Your NFT
        </Button>
      )}
      {isExploding && (
        <Confetti width={width} height={height} recycle={!isComplete} />
      )}
    </>
  );
};
