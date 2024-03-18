import React from 'react';

import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import LayoutTab from '@mlem-admin/components/LayoutTab';
import ItemCreate from '@mlem-admin/modules/AdmBenefitCategory/components/ItemCreate';
import ItemList from '@mlem-admin/modules/AdmBenefitCategory/components/ItemList';

const AdmList = (props) => {
  return (
    <>
      <div className="flex flex-col gap-3 py-24 w-full md:py-5">
        <div className="flex flex-row gap-3 px-10 w-full md:flex-col md:px-3">
          <div className="gap-3 !w-[264px] !min-w-[264px] md:!w-full">
            <LayoutInfo />

            <div className="flex flex-col items-center justify-start w-full mt-5">
              <ItemCreate />
            </div>
          </div>

          <div className="gap-3 w-full">
            <div className="flex flex-col w-full md:hidden">
              <LayoutTab activeTab="benefit_category" />
            </div>

            <div className="flex flex-col gap-3 items-start justify-start w-full">
              <ItemList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmList;
