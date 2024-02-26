import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import AdminNftTable from '@mlem-admin/modules/AdmNftMint/AdminNftTable';

type ListNftMintProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > &
  Partial<{}>;

const ListNftMint: React.FC<ListNftMintProps> = (props) => {
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
              <AdminNftTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListNftMint.defaultProps = {};

export default ListNftMint;
