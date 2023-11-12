"use client";

import { CampaignItem } from "@mlem-user/components/cards/CampaignItem";
import { Button } from "@mlem-user/components/ui/button";
import { useGetRunningCampaigns } from "@mlem-user/services/app/campaign/hooks/useGetRunningCampaigns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";

type ArrowProp = {
  className?: string;
  onClick?: () => void;
  style?: React.StyleHTMLAttributes<HTMLDivElement>;
};

const NextArrow = (props: ArrowProp) => {
  const { onClick, style } = props;
  return (
    <div
      className={`absolute top-1/2 right-[-46px]`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Button variant="outline" className="p-2 rounded-full">
        <ChevronRight color="black" />
      </Button>
    </div>
  );
};

const PrevArrow = (props: ArrowProp) => {
  const { onClick, style } = props;
  return (
    <div
      className={`absolute top-1/2 left-[-46px]`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Button variant="outline" className="p-2 rounded-full">
        <ChevronLeft color="black" />
      </Button>
    </div>
  );
};

export const RunningCampaigns = () => {
  const { data } = useGetRunningCampaigns();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    // Limit the number of slides to show based on the available data the
    slidesToShow: Math.min(4, Math.max(1, data?.length || 0)),
    slidesToScroll: 1,
    draggable: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    arrows: true,
  };

  return (
    <div className="w-full">
      <div>
        <p className="typo-h4">Running Campaigns</p>
      </div>
      <div className="mt-10 ">
        <Slider {...settings}>
          {data?.map((campaign) => (
            <div key={`campaign-${campaign.id}`}>
              <CampaignItem campaign={campaign} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
