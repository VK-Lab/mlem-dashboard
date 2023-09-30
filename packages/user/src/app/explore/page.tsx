import { FeatureCampaigns } from '@mlem-user/modules/feature-campaigns';
import { ListCampaigns } from '@mlem-user/modules/list-campaigns';
import { RunningCampaigns } from '@mlem-user/modules/running-campaigns';
import Image from 'next/image';

export default function Explore() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <HomeContent /> */}
      <ListCampaigns />
    </main>
  );
}
