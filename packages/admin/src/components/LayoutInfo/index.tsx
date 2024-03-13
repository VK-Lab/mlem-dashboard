import React from "react";
import { useEffect, useState } from "react";
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { useAccount } from '@casperdash/usewallet';

import {Text} from '@mlem-admin/components/Text';
import {Img} from '@mlem-admin/components/Img';
import {AdminPaths} from "@mlem-admin/enums/paths.enum";
import {useRouter} from 'next/router';

const ListLeftInfo = () => {
  const [loggedUser, setLoggedUser] = useState({})
  useEffect(() => {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("loggedUser") || ""
    if (value) {
      value = JSON.parse(value)
      setLoggedUser(value)
    }
  }, [])
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 }, isLoading } =
    useGetAccountBalance({
      publicKey,
    });

  const router = useRouter();
  const [openMobi, setOpenMobi] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-start !w-[264px] !min-w-[264px] md:!w-full md:flex-row">
        <div className="flex flex-row items-center justify-start rounded w-full">
          <Img
            className="rounded-[50%] w-[80px] md:w-[60px]"
            src="/v2/images/img_avt.png"
            alt="avatar"
          />
          <div className="flex flex-1 flex-col items-center justify-start px-2 py-1 w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <Text
                className="text-2xl md:text-[22px] text-blue_gray-50 text-center sm:text-xl w-auto"
                size="txtLexendSemiBold24"
              >
                {loggedUser?.userId}
              </Text>
              <Text
                className="text-left text-base text-cyan-400 w-full font-lexend font-semibold"
              >
                {isLoading ? '...' : balance} CSPR
              </Text>
            </div>
          </div>
        </div>

        <div className="flex flex-row hidden md:block">
          <Img
            className="w-[45px]"
            src="/v2/images/m_menu_burger.png"
            alt="menu_avatar"
            onClick={() => setOpenMobi((prev) => !prev)}
          />
          <div className={`absolute right-3 z-10 top-13 bg-gray-300 items-center rounded w-auto z-50 ${
            openMobi
              ? "opacity-100 h-auto"
              : "opacity-0 h-0 transition-all duration-200"
          }`}>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_CAMPAIGNS)}
            >Campaigns
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_NFT_COLLECTIONS)}
            >NFT Collections
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_BROKERS)}
            >Brokers
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_NFT_MINTS)}
            >NFTs
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_BENEFITS)}
            >Benefits
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px] border-b-1 border-b-gray-600"
                 onClick={() => router.push(AdminPaths.LIST_BENEFIT_CATEGORIES)}
            >Benefit Categories
            </div>
            <div className="cursor-pointer px-1 py-2 text-right w-[160px]"
                 onClick={() => router.push(AdminPaths.LIST_CLAIMS)}
            >Claims
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListLeftInfo;
