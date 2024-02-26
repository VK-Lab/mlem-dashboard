import React from "react";

import {Img} from '@mlem-admin/components/Img';
import Header from '@mlem-admin/components/Header';
import Footer from '@mlem-admin/components/Footer';
import ListBenefit from '@mlem-admin/components/ListBenefit';

const AdmDashboard = () => {
  return (
    <>
      <div className="bg-black-900 flex flex-col font-lexend items-start justify-end mx-auto w-full">
        <div className="flex flex-col items-center w-full">
          <div className="h-[1184px] sm:h-[1222px] md:h-[2313px] md:px-5 relative w-full">
            <Img
              className="absolute bottom-[0] h-[453px] object-cover right-[0] w-[5%]"
              src="/v2/images/img_object_4.png"
              alt="object"
            />
            <div className="absolute flex flex-col inset-x-[0] items-center justify-start mx-auto top-[0] w-auto md:w-full">
              <Header />
              <div className="bg-indigo-900 flex flex-col items-center justify-start w-full">
                <Img
                  className="h-40 sm:h-auto object-cover w-full"
                  src="/v2/images/img_freepik13276189_160x1440.png"
                  alt="freepik13276189"
                />
              </div>
              <ListBenefit className="flex flex-col gap-14 items-center justify-center max-w-[1440px] sm:px-5 px-9 py-24 w-full" />

              <Footer className="bg-indigo-900 flex flex-col font-bevietnampro gap-4 items-center justify-start max-w-[1440px] py-24 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmDashboard;
