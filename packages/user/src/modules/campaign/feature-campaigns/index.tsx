"use client";

import { Button } from "@mlem-user/components/ui/button";
import { useGetFeaturedCampaigns } from "@mlem-user/services/campaign/hooks/useGetFeaturedCampaigns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";

import { CampaignCard } from "./components/CampaignCard";

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

export const FeatureCampaigns = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const { data } = useGetFeaturedCampaigns();

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {data?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </Slider>
    </div>
  );
};
