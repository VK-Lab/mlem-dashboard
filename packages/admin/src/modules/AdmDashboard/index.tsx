import React from "react";

import LayoutTab from '@mlem-admin/components/LayoutTab';
import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import ItemList from '@mlem-admin/modules/AdmDashboard/components/ItemList';

const AdmList = (props) => {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center max-w-[1440px] px-9 py-24 w-full sm:px-0 ">
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">

          <div className="flex flex-col gap-3 items-center justify-start !w-[264px] !min-w-[264px] ">
            <LayoutInfo/>
          </div>

          <div className="flex flex-col gap-3 items-start justify-start w-full !min-w-[1092px] !max-w-[1092px]
          sm:!min-w-full sm:!max-w-full">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto ">
              <LayoutTab/>
            </div>

            <div className="grid grid-cols-3 gap-3 items-start justify-start w-full sm:grid-cols-1">
              <ItemList/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmList;
