import React from "react";

import LayoutTab from '@mlem-admin/components/LayoutTab';
import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import ItemList from '@mlem-admin/modules/AdmBroker/components/ItemList';
import ItemCreate from '@mlem-admin/modules/AdmBroker/components/ItemCreate';

const AdmList = (props) => {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center max-w-[1440px] sm:px-5 px-9 py-24 w-full">
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">

          <div className="flex flex-col gap-3 items-center justify-start !w-[264px] !min-w-[264px]">
            <LayoutInfo/>

            <div className="flex flex-col items-center justify-start w-full">
              <ItemCreate/>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full !min-w-[1092px] !max-w-[1092px]">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <LayoutTab/>
            </div>

            <div className="flex flex-col gap-3 items-start justify-start w-full">
              <ItemList/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmList;
