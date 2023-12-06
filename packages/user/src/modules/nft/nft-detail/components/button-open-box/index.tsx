import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@mlem-user/components/ui/button";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { useOpenNFTLuckyBox } from "@mlem-user/services/app/nft/hooks/useOpenNFTLuckyBox";

type Props = {
  contractPackageHash: string;
  tokenId: string;
};
export const ButtonOpenBox = ({ contractPackageHash, tokenId }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useOpenNFTLuckyBox({
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        QueryKeys.NFT,
        contractPackageHash,
        tokenId,
      ]);
    },
  });

  const handleOnClaim = () => {
    mutate({
      contractPackageHash,
      tokenId,
    });
  };

  return (
    <Button className="w-full" onClick={handleOnClaim} isLoading={isLoading}>
      Reveal Your NFT
    </Button>
  );
};
