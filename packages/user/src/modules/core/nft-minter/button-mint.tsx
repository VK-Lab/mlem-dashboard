import { useAccount } from "@casperdash/usewallet";
import { Button, ButtonLoading } from "@mlem-user/components/ui/button";
import { useToast } from "@mlem-user/components/ui/use-toast";
import { DeployActionsEnum } from "@mlem-user/enums/deployActions";
import { ButtonConnect } from "@mlem-user/modules/user/user-header/components/button-connect";

import { UseCreateNFTParams, useCreateNFT } from "./hooks/use-create-nft";
import { useGetPendingTransaction } from "./hooks/use-get-pending-transaction";

type Props = {
  params: UseCreateNFTParams;
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

  const handleOnMintClick = () => {
    if (!params) {
      return;
    }

    mutate(params);
  };

  if (!publicKey) {
    return <ButtonConnect className="px-8 h-12" buttonText="Connect Wallet" />;
  }

  const isMinting = isPending || isLoading;

  return (
    <>
      {!isMinting && (
        <Button className="px-8 h-12" onClick={handleOnMintClick}>
          Mint NFT
        </Button>
      )}
      {isMinting && (
        <ButtonLoading className="px-8 h-12">Minting</ButtonLoading>
      )}
    </>
  );
};
