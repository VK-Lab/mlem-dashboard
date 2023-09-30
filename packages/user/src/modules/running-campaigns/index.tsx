'use client';
import Slider from 'react-slick';

import { CampaignItem } from '@mlem-user/components/cards/CampaignItem';

export const RunningCampaigns = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full">
      <div>
        <p>Running Campaigns</p>
      </div>
      <Slider {...settings}>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
        <div>
          <CampaignItem />
        </div>
      </Slider>
    </div>
  );
};
