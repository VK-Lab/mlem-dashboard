'use client';
import Slider from 'react-slick';

import { CampaignCard } from './components/CampaignCard';

export const FeatureCampaigns = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        <div>
          <CampaignCard />
        </div>
        <div>
          <CampaignCard />
        </div>
      </Slider>
    </div>
  );
};
