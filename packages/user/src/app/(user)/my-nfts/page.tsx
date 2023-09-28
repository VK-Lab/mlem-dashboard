import { BaseContainer } from "@mlem-user/components/container";
import { ListNFTs } from "@mlem-user/modules/list-nfts";
import { UserCover } from "@mlem-user/modules/user-cover";

export default function MyNFTs() {
  return (
    <div className="flex flex-col items-center justify-between">
      <UserCover />
      <BaseContainer className="mt-8">
        <ListNFTs />
      </BaseContainer>
    </div>
  );
}
