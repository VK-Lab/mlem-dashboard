/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import { Ref, forwardRef, useRef } from "react";

import { CampaignItem } from "@mlem-user/components/cards/CampaignItem";
import { Button } from "@mlem-user/components/ui/button";
import { useGetRunningCampaigns } from "@mlem-user/services/app/campaign/hooks/useGetRunningCampaigns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

type ArrowProp = {
  className?: string;
  onClick?: () => void;
};

const NextArrow = forwardRef((props: ArrowProp, ref: Ref<HTMLDivElement>) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} ref={ref} className={className}>
      <Button variant="outline" className="p-2 rounded-full">
        <ChevronRight color="black" />
      </Button>
    </div>
  );
});
NextArrow.displayName = "NextArrow";

const PrevArrow = forwardRef((props: ArrowProp, ref: Ref<HTMLDivElement>) => {
  const { className, onClick } = props;

  return (
    <div onClick={onClick} ref={ref} className={className}>
      <Button variant="outline" className="p-2 rounded-full">
        <ChevronLeft color="black" />
      </Button>
    </div>
  );
});
PrevArrow.displayName = "PrevArrow";

const SLIDE_PER_VIEW = 4;
const WIDTH = 270;

export const RunningCampaigns = () => {
  const { data = [], isLoading } = useGetRunningCampaigns();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null!);

  const isShowNavigation = data?.length > SLIDE_PER_VIEW;

  const calculatedWidth = data?.length * WIDTH;

  if (isLoading) {
    return null;
  }

  return (
    <div
      style={{
        width: calculatedWidth,
      }}
    >
      <div>
        <p className="typo-h4">Running Campaigns</p>
      </div>
      <div className="mt-10 flex items-center justify-between">
        {isShowNavigation && (
          <PrevArrow
            className={"mr-10"}
            onClick={() => swiperRef.current?.slidePrev()}
          />
        )}

        <Swiper
          slidesPerView={Math.min(data?.length || 1, SLIDE_PER_VIEW)}
          spaceBetween={30}
          scrollbar={{ draggable: true }}
          navigation
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data?.map((campaign) => (
            <SwiperSlide key={`campaign-${campaign.id}`}>
              <CampaignItem campaign={campaign} />
            </SwiperSlide>
          ))}
        </Swiper>
        {isShowNavigation && (
          <NextArrow
            className="ml-10"
            onClick={() => swiperRef.current?.slideNext()}
          />
        )}
      </div>
    </div>
  );
};
