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
      <div className="flex flex-col gap-3 py-24 w-full md:py-5">
        <div className="flex flex-row gap-3 px-10 w-full md:flex-col md:px-3">
          <div className="gap-3 !w-[264px] !min-w-[264px] md:!w-full">
            <LayoutInfo/>

            <div className="flex flex-col items-center justify-start w-full mt-5">
              <div
                className="border-indigo-400 border-l-4 border-solid flex flex-col w-full round bg-indigo-900_cc pb-4 pt-[19px] px-4">
                <Text className="!text-white-A700 font-lexend w-full text-[13px]">NFT Collection:</Text>
                <Text className="!text-white-A700 font-lexend w-full text-[13px] mt-1">{nftCollectionId}</Text>
              </div>
            </div>

            <div className="flex flex-col items-center justify-start w-full mt-5">
              <TierCreate nftCollectionId={nftCollectionId}/>
            </div>
          </div>

          <div className="gap-3 w-full">
            <div className="flex flex-col w-full md:hidden">
              <LayoutTab activeTab="nft_collection"/>
            </div>

            <div className="flex flex-col gap-3 items-start justify-start w-full">
              <TierList nftCollectionId={nftCollectionId}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmManageTiers;
