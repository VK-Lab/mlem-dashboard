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

export const RunningCampaigns = () => {
  const { data = [], isLoading } = useGetRunningCampaigns();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null!);

  const isUsingSlide = data?.length > SLIDE_PER_VIEW;

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div>
        <p className="typo-h4">Running Campaigns</p>
      </div>
      {isUsingSlide ? (
        <div className="mt-10 flex items-center justify-between">
          <PrevArrow
            className={"mr-10"}
            onClick={() => swiperRef.current?.slidePrev()}
          />

          <Swiper
            spaceBetween={30}
            scrollbar={{ draggable: true }}
            navigation
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              720: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1080: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1360: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {data?.map((campaign) => (
              <SwiperSlide key={`campaign-${campaign.id}`}>
                <CampaignItem campaign={campaign} isShowStatus={false} />
              </SwiperSlide>
            ))}
          </Swiper>
          <NextArrow
            className="ml-10"
            onClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      ) : (
        <div className="mt-10 flex items-center gap-10 flex-wrap justify-center md:justify-start">
          {data?.map((campaign) => (
            <CampaignItem
              key={`campaign-${campaign.id}`}
              campaign={campaign}
              isShowStatus={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};
