import React from "react";

import TabContentHeader from '@mlem-admin/components/TabContentHeader';
import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import ItemTierList from '@mlem-admin/modules/AdmNftCollection/ItemTiers/List';
import ItemTierCreate from '@mlem-admin/modules/AdmNftCollection/ItemTiers/Create';

type Props = {
  nftCollectionId: string;
};

const ListNftCollectionTier = ({ nftCollectionId }: Props) => {
  return (
    <>
      <div>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo />
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full !min-w-[1092px] !max-w-[1092px]">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <TabContentHeader />
            </div>
            <ItemTierCreate nftCollectionId={nftCollectionId} />
            <div className="grid grid-cols-3 gap-4 items-start justify-start w-full">
              <ItemTierList nftCollectionId={nftCollectionId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListNftCollectionTier;
