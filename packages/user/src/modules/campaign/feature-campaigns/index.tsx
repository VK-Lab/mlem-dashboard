"use client";

import { useGetFeaturedCampaigns } from "@mlem-user/services/app/campaign/hooks/useGetFeaturedCampaigns";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { CampaignCard } from "./components/CampaignCard";

export const FeatureCampaigns = () => {
  const { data = [] } = useGetFeaturedCampaigns();

  return (
    <div className="w-full relative">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {data?.map((campaign) => (
          <SwiperSlide key={campaign.id}>
            <CampaignCard campaign={campaign} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
