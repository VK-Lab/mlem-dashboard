import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mlem-user/components/ui/card";
import { Campaign } from "@mlem-user/types/campaign";
import { cn } from "@mlem-user/utils";

type CampaignCardProps = {
  className?: string;
  campaign?: Campaign;
};

export const CampaignCard = ({ className, campaign }: CampaignCardProps) => {
  return (
    <Link href={`/campaigns/${campaign?.id}`}>
      <Card className={cn("w-full h-[400px]", className)}>
        <CardHeader className="relative h-[300px]">
          <Image
            src={campaign?.imageUrl || ""}
            alt="Campaign Image"
            fill={true}
            className="p-2 rounded-xl"
            priority
            objectFit="contain"
          />
        </CardHeader>
        <CardContent className="my-5 mx-auto">
          <CardTitle className="text-center typo-h3">
            {campaign?.name}
          </CardTitle>
          <CardDescription className="text-center mt-4">
            {campaign?.shortDescription}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
