import { BaseContainer } from "@mlem-user/components/container";
import { CampaignDetail } from "@mlem-user/modules/campaign/campaign-detail";
import { ListCampaigns } from "@mlem-user/modules/campaign/list-campaigns";

type Props = { params: { id: string } };

export default function Campaign({ params }: Props) {
  const { id } = params;

  return (
    <BaseContainer>
      <CampaignDetail campaignId={id} />
      <div className="mt-10">
        <div className="typo-h4">Explore More</div>
        <div className="mt-4">
          <ListCampaigns />
        </div>
      </div>
    </BaseContainer>
  );
}
