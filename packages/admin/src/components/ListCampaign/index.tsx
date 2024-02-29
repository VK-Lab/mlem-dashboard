import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import ItemListCampaign from '@mlem-admin/modules/AdmDashboard/ItemList';

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
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full !max-w-[1092px]">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <TabContentHeader />
            </div>
            <div className="grid grid-cols-3 gap-4 items-start justify-start w-full">
              <ItemListCampaign />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListCampaign.defaultProps = {};

export default ListCampaign;
