import React from 'react';
import { AdminPaths } from '@mlem-admin/enums/paths.enum';
import { useRouter } from 'next/router';

type TabProps = {
  activeTab: string;
};

const TabContentHeader = (TabProps) => {
  const router = useRouter();

  return (
    <>
      <div className="bg-gray-900 flex flex-row h-11 items-start justify-start rounded md:flex-col">
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_CAMPAIGNS
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_CAMPAIGNS)}
        >Campaigns</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_NFT_COLLECTIONS || TabProps.activeTab == 'nft_collection'
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_NFT_COLLECTIONS)}
        >NFT Collections</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_BROKERS
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_BROKERS)}
        >Brokers</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_NFT_MINTS
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_NFT_MINTS)}
        >NFTs</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_BENEFITS
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_BENEFITS)}
        >Benefits</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_BENEFIT_CATEGORIES
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_BENEFIT_CATEGORIES)}
        >Benefit Categories</button>
        <button className={`!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm hover:bg-indigo-500_7f rounded p-[13px] ${
          router.pathname == AdminPaths.LIST_CLAIMS
            ? 'bg-indigo-500_7f'
            : 'bg-gray_900'
        }`}
                onClick={() => router.push(AdminPaths.LIST_CLAIMS)}
        >Claims</button>
      </div>
    </>
  );
};

TabContentHeader.defaultProps = {};

export default TabContentHeader;
