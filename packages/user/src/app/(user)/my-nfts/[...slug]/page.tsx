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
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-8">
      <NFTDetail contractPackageHash={contractPackageHash} tokenId={tokenId} />
    </main>
  );
}
