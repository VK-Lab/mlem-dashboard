import React from "react";

import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import Steps from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/Steps';
import ItemCreate from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/StepCampaign/Create';

const StepCampaign = (props) => {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center max-w-[1440px] sm:px-5 px-9 py-24 w-full">
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">

          <div className="flex flex-col gap-3 items-center justify-start !w-[264px] !min-w-[264px]">
            <LayoutInfo/>
          </div>

          <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full !min-w-[700px]">
            <ItemCreate/>
          </div>

          <div className="flex flex-1 flex-col items-start justify-start w-full !min-w-[380px]">
            <Steps/>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepCampaign;
