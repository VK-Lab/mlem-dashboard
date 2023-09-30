import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@mlem-user/components/ui/card';
import { cn } from '@mlem-user/utils';
import Image from 'next/image';

type CampaignCardProps = {
  className?: string;
};

export const CampaignCard = ({ className }: CampaignCardProps) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="relative h-[400px]">
        <Image
          src="https://s3.ap-northeast-1.amazonaws.com/quest3.xyz/event/749098189352194072.png"
          fill={true}
          alt="Campaign Image"
          className="p-2 rounded-xl"
        />
      </CardHeader>
      <CardContent className="mt-4 mx-auto">
        <CardTitle className="text-center">Campaign Name</CardTitle>
        <CardDescription className="text-center">Card Description</CardDescription>
      </CardContent>

    </Card>
  );
};
