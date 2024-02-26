import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import AdminCampaignTable from '@mlem-admin/modules/AdmDashboard/AdminCampaignTable';

type ListCampaignProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > &
  Partial<{}>;

const ListCampaign: React.FC<ListCampaignProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <TabContentHeader />
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
              <AdminCampaignTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListCampaign.defaultProps = {};

export default ListCampaign;
