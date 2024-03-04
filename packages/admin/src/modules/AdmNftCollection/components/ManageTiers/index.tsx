import React from "react";

import LayoutTab from '@mlem-admin/components/LayoutTab';
import LayoutInfo from '@mlem-admin/components/LayoutInfo';
import TierList from '@mlem-admin/modules/AdmNftCollection/components/ManageTiers/TierList';
import TierCreate from '@mlem-admin/modules/AdmNftCollection/components/ManageTiers/TierCreate';
import {Text} from "@mlem-admin/components/Text";

type Props = {
  nftCollectionId: string;
};
const AdmManageTiers = ({nftCollectionId}: Props) => {
  return (
    <>
      <div className="flex flex-col gap-14 items-center justify-center max-w-[1440px] sm:px-5 px-9 py-24 w-full">
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">

          <div className="flex flex-col gap-6 items-center justify-start !w-[264px] !min-w-[264px]">
            <LayoutInfo/>

            <div className="flex flex-col items-center justify-start w-full">
              <div
                className="border-indigo-400 border-l-4 border-solid flex flex-col w-full round bg-indigo-900_cc pb-4 pt-[19px] px-4">
                <Text className="!text-white-A700 font-lexend w-full text-[13px]">NFT Collection:</Text>
                <Text className="!text-white-A700 font-lexend w-full text-[13px] mt-1">{nftCollectionId}</Text>
              </div>
            </div>

            <div className="flex flex-col items-center justify-start w-full">
              <TierCreate nftCollectionId={nftCollectionId}/>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full !min-w-[1092px] !max-w-[1092px]">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <LayoutTab activeTab="nft_collection"/>
            </div>

            <div className="flex flex-col gap-4 items-start justify-start w-full">
              <TierList nftCollectionId={nftCollectionId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmManageTiers;
