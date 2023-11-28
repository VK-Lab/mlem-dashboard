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

type CampaignCardProps = {
  className?: string;
  campaign?: Campaign;
};

export const CampaignCard = ({ className, campaign }: CampaignCardProps) => {
  return (
    <Link href={`/campaigns/${campaign?.id}`}>
      <Card className={cn("w-full", className)}>
        <CardHeader className="relative h-[400px]">
          <Image
            src={campaign?.imageUrl || ""}
            fill={true}
            alt="Campaign Image"
            className="p-2 rounded-xl"
            priority
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
