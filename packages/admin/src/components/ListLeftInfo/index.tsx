import React from "react";
import { useEffect, useState } from "react";
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { useAccount } from '@casperdash/usewallet';

import {Text} from '@mlem-admin/components/Text';
import {Img} from '@mlem-admin/components/Img';

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

  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-start !w-[264px] !min-w-[264px]">
        <div className="flex flex-row items-center justify-start rounded w-full">
          <Img
            className="h-20 md:h-auto rounded-[50%] w-20"
            src="/v2/images/img_avt.png"
            alt="avt"
          />
          <div className="flex flex-1 flex-col items-center justify-start px-2 py-1 rounded-[32px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <Text
                className="text-2xl md:text-[22px] text-blue_gray-50 text-center sm:text-xl w-auto"
                size="txtLexendSemiBold24"
              >
                {loggedUser?.userId}
              </Text>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full">
          <div
            className="border-indigo-400 border-l-4 border-solid flex w-full round bg-indigo-900_cc pb-4 pt-[19px] px-4">
            <Text className="!text-white-A700 font-lexend w-1/3 text-[13px]">Balance: </Text>
            <Text className="!text-white-A700 font-lexend w-1/3 text-[16px] -mt-0.5 text-center">{isLoading ? '...' : balance}</Text>
            <Text className="!text-white-A700 font-lexend w-1/3 text-[12px] text-right">CSPR</Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListLeftInfo;
