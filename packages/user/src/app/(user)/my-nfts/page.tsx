import { BaseContainer } from "@mlem-user/components/container";
import { UserCover } from "@mlem-user/modules/@layouts/user-cover";
import { ListNFTs } from "@mlem-user/modules/nft/list-nfts";

export default function MyNFTs() {
  return (
    <div className="flex flex-col items-center justify-between">
      <UserCover />
      <BaseContainer className="mt-4">
        <ListNFTs />
      </BaseContainer>
    </div>
  );
}
