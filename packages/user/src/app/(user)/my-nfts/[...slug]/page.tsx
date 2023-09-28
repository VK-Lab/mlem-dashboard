import { NFTDetail } from "@mlem-user/modules/nft-detail";

type Props = {
  params: {
    slug: string[];
  };
};

export default function MyNFT({ params }: Props) {
  const { slug } = params;
  const [tokenAddress, tokenId] = slug;

  if (!tokenAddress || !tokenId) {
    return <div>Not found</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between  px-24 py-8">
      <NFTDetail tokenAddress={tokenAddress} tokenId={tokenId} />
    </main>
  );
}
