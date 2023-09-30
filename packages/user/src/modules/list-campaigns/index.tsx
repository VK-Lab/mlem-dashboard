import { CampaignItem } from '@mlem-user/components/cards/CampaignItem';
import Link from 'next/link';

export const ListCampaigns = () => {
  return (
    <div className="fex">
      <div className="flex justify-between gap-4 flex-wrap">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((item) => (
          <Link href="/campaign">
            <CampaignItem key={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
