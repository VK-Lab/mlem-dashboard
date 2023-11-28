import { Badge } from "@mlem-user/components/ui/badge";
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
  isShowStatus?: boolean;
};

const statusColorMap = {
  running: "bg-green-500",
  pending: "bg-yellow-500",
  ended: "bg-gray-500",
};

export const CampaignItem = ({
  className,
  campaign,
  isShowStatus = true,
}: CampaignItemProps) => {
  return (
    <Card className={cn("h-[300px] w-[240px] relative capitalize", className)}>
      <Link key={`item-${campaign?.id}`} href={`/campaigns/${campaign?.id}`}>
        {isShowStatus && (
          <Badge
            className={cn(
              "absolute z-10 top-2 right-2",
              statusColorMap[campaign.status as keyof typeof statusColorMap]
            )}
          >
            {campaign.status}
          </Badge>
        )}
        <CardHeader className="relative h-[180px]">
          <Image
            src={campaign?.thumbnailUrl || campaign?.imageUrl}
            fill={true}
            alt="Campaign Image"
            className="p-2 rounded-xl"
            objectFit="contain"
          />
        </CardHeader>
        <CardContent className="mt-4">
          <CardTitle className="line-clamp-1">{campaign?.name}</CardTitle>
          <CardDescription className="mt-2 truncate line-clamp-2 text-ellipsis overflow-hidden">
            {campaign?.shortDescription}
          </CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
};
