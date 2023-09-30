import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@mlem-user/components/ui/card';
import { cn } from '@mlem-user/utils';
import Image from 'next/image';

type CampaignItemProps = {
  className?: string;
};

export const CampaignItem = ({ className }: CampaignItemProps) => {
  return (
    <Card className={cn('h-[300px] w-[240px]', className)}>
      <CardHeader className="relative h-[180px]">
        <Image
          src="https://s3.ap-northeast-1.amazonaws.com/quest3.xyz/event/749098189352194072.png"
          fill={true}
          alt="Campaign Image"
          className="p-2 rounded-xl"
        />
      </CardHeader>
      <CardContent className="mt-4">
        <CardTitle>Campaign Name</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardContent>

    </Card>
  );
};
