import { FeatureCampaigns } from '@mlem-user/modules/feature-campaigns';
import { ListCampaigns } from '@mlem-user/modules/list-campaigns';
import { RunningCampaigns } from '@mlem-user/modules/running-campaigns';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen justify-between p-24">
      <FeatureCampaigns />
      <div className="mt-16">
        <RunningCampaigns />
      </div>
      {/* <HomeContent /> */}
      {/* <ListCampaigns /> */}
    </main>
  );
}
