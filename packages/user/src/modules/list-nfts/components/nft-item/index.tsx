import { useAccount } from "@casperdash/usewallet";
import { GradientAvatar } from "@mlem-user/components/avatar/gradient-avatar";
import { NFTAsset } from "@mlem-user/components/nft-asset";
import { MiddleTruncatedText } from "@mlem-user/components/truncated-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mlem-user/components/ui/card";
import { NFT } from "@mlem-user/types/nft";
import { cn } from "@mlem-user/utils";

type NFTItemProps = {
  className?: string;
  nft: NFT;
};

export const NFTItem = ({ className, nft }: NFTItemProps) => {
  const { publicKey = "" } = useAccount();

  return (
    <Card className={cn("h-[400px] w-[260px]", className)}>
      <CardHeader className="relative h-[240px]">
        <NFTAsset url={nft?.imageUrl} className="h-full" />
      </CardHeader>
      <CardContent className="mt-4 h-[90px]">
        <CardTitle>{nft?.name}</CardTitle>
        <CardDescription className="mt-4">{nft?.description}</CardDescription>
      </CardContent>
      <CardFooter className="mt-4">
        <div className="flex gap-2 items-center	">
          <GradientAvatar name={publicKey as string} size={20} />
          <MiddleTruncatedText className="text-xs">
            {publicKey}
          </MiddleTruncatedText>
        </div>
      </CardFooter>
    </Card>
  );
};
