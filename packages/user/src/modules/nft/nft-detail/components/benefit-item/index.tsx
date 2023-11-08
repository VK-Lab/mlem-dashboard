import { Button } from "@mlem-user/components/ui/button";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { useClaimNFTBenefit } from "@mlem-user/services/app/nft/hooks/useClaimNFTBenefit";
import { Benefit } from "@mlem-user/types/benefit";
import { ClaimStatusEnum } from "@mlem-user/types/claim";
import { useQueryClient } from "@tanstack/react-query";
import { match } from "ts-pattern";

type Props = {
  benefit: Benefit;
  nftId: string;
  tokenAddress: string;
  tokenId: string;
};

const getButtonStatus = (benefit: Benefit) => {
  return match(benefit)
    .with({ status: ClaimStatusEnum.ACCEPTED }, () => {
      return {
        text: "Claimed",
        isDisabled: true,
      };
    })
    .with({ status: ClaimStatusEnum.PENDING }, () => {
      return {
        text: "Pending",
        isDisabled: true,
      };
    })
    .with({ status: ClaimStatusEnum.REJECTED }, () => {
      return {
        text: "Rejected",
        isDisabled: false,
      };
    })
    .otherwise(() => {
      return {
        text: "Claim",
        isDisabled: false,
      };
    });
};

export const BenefitItem = ({
  benefit,
  nftId,
  tokenAddress,
  tokenId,
}: Props) => {
  const buttonStatus = getButtonStatus(benefit);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useClaimNFTBenefit({
    onSuccess: async () => {
      await queryClient.invalidateQueries([
        QueryKeys.NFT,
        tokenAddress,
        tokenId,
      ]);
    },
  });

  const handleOnClaim = () => {
    mutate({
      benefitId: benefit.id,
      nftId,
    });
  };

  return (
    <div className="flex flex-row p-4 w-full justify-between bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-100 via-violet-300 to-blue-300 rounded-lg">
      <div className="text-xs basis-1/2">{benefit?.name}</div>
      <div className="text-sm text-gray-800">
        <Button
          disabled={buttonStatus.isDisabled || isLoading}
          className="text-xs min-w-[100px]"
          onClick={handleOnClaim}
        >
          {isLoading ? "Claiming" : buttonStatus.text}
        </Button>
      </div>
    </div>
  );
};
