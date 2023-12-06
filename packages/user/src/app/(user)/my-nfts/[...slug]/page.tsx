import { BaseContainer } from "@mlem-user/components/container";
import { NFTDetail } from "@mlem-user/modules/nft/nft-detail";

type Props = {
  params: {
    slug: string[];
  };
};

export default function MyNFT({ params }: Props) {
  const { slug } = params;
  const [contractPackageHash, tokenId] = slug;

  if (!contractPackageHash || !tokenId) {
    return <div>Not found</div>;
  }

  return (
    <BaseContainer className="mt-4">
      <NFTDetail contractPackageHash={contractPackageHash} tokenId={tokenId} />
    </BaseContainer>
  );
}
