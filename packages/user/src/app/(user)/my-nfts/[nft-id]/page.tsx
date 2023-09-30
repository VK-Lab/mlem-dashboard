import { ListNFTs } from '@mlem-user/modules/list-nfts';
import { NFTDetail } from '@mlem-user/modules/nft-detail';

export default function MyNFT() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NFTDetail />
    </main>
  );
}
