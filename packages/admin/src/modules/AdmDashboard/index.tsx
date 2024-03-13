import React from "react";

import LayoutTab from '@mlem-admin/components/LayoutTab';
import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import ItemList from '@mlem-admin/modules/AdmDashboard/components/ItemList';

const AdmList = (props) => {
  return (
    <>
      <div className="flex flex-col gap-3 py-24 w-full md:py-5">
        <div className="flex flex-row gap-3 px-10 w-full md:flex-col md:px-3">
          <div className="gap-3 !w-[264px] !min-w-[264px] md:!w-full">
            <LayoutInfo/>
          </div>

          <div className="gap-3 w-full">
            <div className="flex flex-col w-full md:hidden">
              <LayoutTab activeTab="campaign"/>
            </div>

            <div className="flex flex-col w-full">
              <div className="grid grid-cols-3 gap-3 w-full lg:grid-cols-2 md:grid-cols-1">
                <ItemList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmList;
