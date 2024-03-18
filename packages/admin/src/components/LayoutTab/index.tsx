import React from 'react';

import { Button } from '@mlem-admin/components/Button';
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
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[100px]"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_CAMPAIGNS
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_CAMPAIGNS)}
        >
          Campaigns
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[135px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_NFT_COLLECTIONS ||
            TabProps.activeTab == 'nft_collection'
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_NFT_COLLECTIONS)}
        >
          NFT Collections
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[80px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_BROKERS
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_BROKERS)}
        >
          Brokers
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[60px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_NFT_MINTS
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_NFT_MINTS)}
        >
          NFTs
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[90px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_BENEFITS
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_BENEFITS)}
        >
          Benefits
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[160px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_BENEFIT_CATEGORIES
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_BENEFIT_CATEGORIES)}
        >
          Benefit Categories
        </Button>
        <Button
          className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[70px] hover:bg-indigo-500_7f"
          shape="round"
          color={
            router.pathname == AdminPaths.LIST_CLAIMS
              ? 'indigo_500_7f'
              : 'gray_900'
          }
          size="sm"
          variant="fill"
          onClick={() => router.push(AdminPaths.LIST_CLAIMS)}
        >
          Claims
        </Button>
      </div>
    </>
  );
};

TabContentHeader.defaultProps = {};

export default TabContentHeader;
