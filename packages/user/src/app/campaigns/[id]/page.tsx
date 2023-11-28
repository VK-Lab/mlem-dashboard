import { BaseContainer } from "@mlem-user/components/container";
import { CampaignDetail } from "@mlem-user/modules/campaign/campaign-detail";
import { ExplorerCampaigns } from "@mlem-user/modules/campaign/explorer-campaigns";

type Props = { params: { id: string } };

export default function Campaign({ params }: Props) {
  const { id } = params;

  return (
    <BaseContainer>
      <CampaignDetail campaignId={id} />
      <ExplorerCampaigns excludedIds={[id]} />
    </BaseContainer>
  );
}
