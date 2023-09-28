import { BaseContainer } from "@mlem-user/components/container";
import { CampaignDetail } from "@mlem-user/modules/campaign-detail";

type Props = { params: { id: string } };

export default function Campaign({ params }: Props) {
  const { id } = params;

  return (
    <BaseContainer>
      <CampaignDetail campaignId={id} />
    </BaseContainer>
  );
}
