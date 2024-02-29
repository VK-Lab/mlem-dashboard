import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import AdmBrokerTable from '@mlem-admin/modules/AdmBroker/BrokerTable';

type ListBrokerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > &
  Partial<{}>;

const ListBroker: React.FC<ListBrokerProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full !max-w-[1092px]">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <TabContentHeader />
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
              <AdmBrokerTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListBroker.defaultProps = {};

export default ListBroker;
