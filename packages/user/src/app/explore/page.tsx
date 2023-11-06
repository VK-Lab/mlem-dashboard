import { BaseContainer } from "@mlem-user/components/container";
import { ListCampaigns } from "@mlem-user/modules/campaign/list-campaigns";

export default function Explore() {
  return (
    <BaseContainer>
      <ListCampaigns />
    </BaseContainer>
  );
}
