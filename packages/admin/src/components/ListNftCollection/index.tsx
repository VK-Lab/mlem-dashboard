import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import ItemListNftCollection from '@mlem-admin/modules/AdmNftCollection/ItemList';

type ListNftCollectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
  > &
  Partial<{}>;

const ListNftCollection: React.FC<ListNftCollectionProps> = (props) => {
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
              <ItemListNftCollection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ListNftCollection.defaultProps = {};

export default ListNftCollection;
