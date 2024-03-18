import React from 'react';

import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import ItemCreate from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/StepNftCollection/Create';
import Steps from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/Steps';

const StepNftCollection = () => {
  return (
    <>
      <div className="flex flex-col gap-3 py-24 w-full md:py-5">
        <div className="flex flex-row gap-3 px-10 w-full md:flex-col md:px-3">
          <div className="gap-3 !w-[264px] !min-w-[264px] md:!w-full">
            <LayoutInfo />
          </div>

          <div className="gap-3 !min-w-[330px] hidden md:block">
            <Steps current={1} />
          </div>

          <div className="gap-3 w-full items-center justify-self-center">
            <ItemCreate />
          </div>

          <div className="gap-3 !min-w-[330px] md:hidden">
            <Steps current={1} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StepNftCollection;
