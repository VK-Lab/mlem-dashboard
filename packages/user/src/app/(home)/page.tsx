import { dehydrate } from "@tanstack/react-query";

import { BaseContainer } from "@mlem-user/components/container";
import { QueryKeys } from "@mlem-user/enums/queryKeys";
import { getQueryClient } from "@mlem-user/lib/query-client";
import { ReactQueryHydrate } from "@mlem-user/modules/@core/hydrate-client";
import { FeatureCampaigns } from "@mlem-user/modules/campaign/feature-campaigns";
import { RunningCampaigns } from "@mlem-user/modules/campaign/running-campaigns";
import {
  getFeaturedCampaigns,
  getRunningCampaigns,
} from "@mlem-user/services/app/campaign";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [QueryKeys.GET_FEATURED_CAMPAIGNS],
    getFeaturedCampaigns
  );
  await queryClient.prefetchQuery(
    [QueryKeys.GET_RUNNING_CAMPAIGNS],
    getRunningCampaigns
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <BaseContainer className="mt-4">
      <ReactQueryHydrate state={dehydratedState}>
        <FeatureCampaigns />
        <div className="mt-8">
          <RunningCampaigns />
        </div>
      </ReactQueryHydrate>
    </BaseContainer>
  );
}
