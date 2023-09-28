import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mlem-user/components/ui/card";
import { Campaign } from "@mlem-user/types/campaign";
import { cn } from "@mlem-user/utils";
import Image from "next/image";
import Link from "next/link";

type CampaignItemProps = {
  className?: string;
  campaign: Campaign;
};

export const CampaignItem = ({ className, campaign }: CampaignItemProps) => {
  return (
    <Card className={cn("h-[300px] w-[240px]", className)}>
      <Link key={`item-${campaign?.id}`} href={`/campaigns/${campaign?.id}`}>
        <CardHeader className="relative h-[180px]">
          <Image
            src={campaign?.imageUrl}
            fill={true}
            alt="Campaign Image"
            className="p-2 rounded-xl"
          />
        </CardHeader>
        <CardContent className="mt-4">
          <CardTitle className="line-clamp-1">{campaign?.name}</CardTitle>
          <CardDescription className="mt-2 truncate line-clamp-2 text-ellipsis overflow-hidden">
            {campaign?.description}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
};
