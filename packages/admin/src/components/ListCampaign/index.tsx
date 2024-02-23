import React from "react";

import {Button} from '@mlem-admin/components/Button';
import {Text} from '@mlem-admin/components/Text';
import {Img} from '@mlem-admin/components/Img';
import {Input} from '@mlem-admin/components/Input';
import {List} from '@mlem-admin/components/List';

type TableWallet02Props = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  | "username"
  | "useraddress"
  | "mission"
  | "nfts"
  | "totalWhaleStaked"
  | "whalecounter"
  | "price"
  | "whalecounter1"
  | "price1"
  | "whalecounter2"
  | "price2"
  | "frame1321314889"
  | "totalclaimablerewards"
  | "price3"
  | "price4"
  | "frame1321314889one"
  | "unlockdate"
  | "unlockdate1"
  | "unlockdate2"
  | "nextEpoch"
  | "duration"
  | "duration1"
  | "duration2"
  | "manage"
  | "manage1"
  | "manage2"
  > &
  Partial<{
    username: string;
    useraddress: string;
    mission: string;
    nfts: string;
    totalWhaleStaked: string;
    whalecounter: string;
    price: string;
    whalecounter1: string;
    price1: string;
    whalecounter2: string;
    price2: string;
    frame1321314889: string;
    totalclaimablerewards: string;
    price3: string;
    price4: string;
    frame1321314889one: string;
    unlockdate: string;
    unlockdate1: string;
    unlockdate2: string;
    nextEpoch: string;
    duration: string;
    duration1: string;
    duration2: string;
    manage: string;
    manage1: string;
    manage2: string;
  }>;

const TableWallet02: React.FC<TableWallet02Props> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <div className="flex flex-col gap-6 items-center justify-start w-[264px]">
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
                    {props?.username}
                  </Text>
                  <Text
                    className="text-base text-cyan-400 w-full"
                    size="txtLexendSemiBold16"
                  >
                    {props?.useraddress}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full">
              <Input
                name="menuitem"
                placeholder="Project"
                className="!placeholder:text-blue_gray-50 !text-blue_gray-50 font-lexend p-0 text-base text-center w-full"
                wrapClassName="border-indigo-400 border-l-4 border-solid flex w-full"
                suffix={
                  <Img
                    className="mt-px mb-[3px] h-4 ml-[35px]"
                    src="/v2/images/img_alertcircle.svg"
                    alt="alert-circle"
                  />
                }
                shape="round"
                color="indigo_900_cc"
                size="sm"
                variant="fill"
              ></Input>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 items-start justify-start w-full">
            <div className="flex flex-col h-11 md:h-auto items-center justify-start w-auto">
              <div className="bg-gray-900 flex flex-row h-11 md:h-auto items-start justify-start rounded">
                <Button
                  className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[120px]"
                  shape="round"
                  color="indigo_500_7f"
                  size="sm"
                  variant="fill"
                >
                  {props?.mission}
                </Button>
                <Button
                  className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-[120px]"
                  shape="round"
                  color="gray_900"
                  size="sm"
                  variant="fill"
                >
                  {props?.nfts}
                </Button>
              </div>
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start w-full">
              <div className="flex flex-col items-center justify-center w-auto">
                <List
                  className="flex flex-col gap-2 items-center w-full"
                  orientation="vertical"
                >
                  <Button
                    className="!text-gray-400 cursor-pointer flex-1 font-bevietnampro font-semibold h-10 text-center text-sm w-full"
                    shape="square"
                    color="indigo_900_cc"
                    size="sm"
                    variant="fill"
                  >
                    {props?.totalWhaleStaked}
                  </Button>
                  <div className="bg-indigo-900_cc flex flex-1 flex-col gap-1 h-24 md:h-auto items-start justify-center px-4 py-3 w-full">
                    <div className="flex flex-col items-start justify-center w-auto">
                      <Text
                        className="text-base text-gray-100 w-auto"
                        size="txtBeVietnamProSemiBold16Gray100"
                      >
                        {props?.whalecounter}
                      </Text>
                    </div>
                    <Text
                      className="text-blue_gray-100 text-sm w-auto"
                      size="txtBeVietnamProSemiBold14"
                    >
                      {props?.price}
                    </Text>
                  </div>
                  <div className="bg-indigo-900_cc flex flex-1 flex-col gap-1 h-24 md:h-auto items-start justify-center px-4 py-3 w-full">
                    <div className="flex flex-col items-start justify-center w-auto">
                      <Text
                        className="text-base text-gray-100 w-auto"
                        size="txtBeVietnamProSemiBold16Gray100"
                      >
                        {props?.whalecounter1}
                      </Text>
                    </div>
                    <Text
                      className="text-blue_gray-100 text-sm w-auto"
                      size="txtBeVietnamProSemiBold14"
                    >
                      {props?.price1}
                    </Text>
                  </div>
                  <div className="bg-indigo-900_cc flex flex-1 flex-col gap-1 h-24 md:h-auto items-start justify-center px-4 py-3 w-full">
                    <div className="flex flex-col items-start justify-center w-auto">
                      <Text
                        className="text-base text-gray-100 w-auto"
                        size="txtBeVietnamProSemiBold16Gray100"
                      >
                        {props?.whalecounter2}
                      </Text>
                    </div>
                    <Text
                      className="text-blue_gray-100 text-sm w-auto"
                      size="txtBeVietnamProSemiBold14"
                    >
                      {props?.price2}
                    </Text>
                  </div>
                </List>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center w-auto">
                <Text
                  className="bg-indigo-900_cc h-10 justify-center pl-4 sm:pr-5 pr-[35px] py-2.5 text-gray-400 text-sm w-full"
                  size="txtBeVietnamProSemiBold14Gray400"
                >
                  {props?.frame1321314889}
                </Text>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.totalclaimablerewards}
                    </Text>
                  </div>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.price3}
                    </Text>
                  </div>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.price4}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center w-auto">
                <Text
                  className="bg-indigo-900_cc h-10 justify-center pl-4 sm:pr-5 pr-[35px] py-2.5 text-gray-400 text-sm w-full"
                  size="txtBeVietnamProSemiBold14Gray400"
                >
                  {props?.frame1321314889one}
                </Text>
                <Button
                  className="!text-gray-100 cursor-pointer font-bevietnampro font-semibold h-24 text-base text-center w-full"
                  shape="square"
                  color="indigo_900_cc"
                  size="md"
                  variant="fill"
                >
                  {props?.unlockdate}
                </Button>
                <Button
                  className="!text-gray-100 cursor-pointer font-bevietnampro font-semibold h-24 text-base text-center w-full"
                  shape="square"
                  color="indigo_900_cc"
                  size="md"
                  variant="fill"
                >
                  {props?.unlockdate1}
                </Button>
                <Button
                  className="!text-gray-100 cursor-pointer font-bevietnampro font-semibold h-24 text-base text-center w-full"
                  shape="square"
                  color="indigo_900_cc"
                  size="md"
                  variant="fill"
                >
                  {props?.unlockdate2}
                </Button>
              </div>
              <div className="flex flex-col gap-2 items-center justify-center w-auto">
                <Button
                  className="!text-gray-400 cursor-pointer font-bevietnampro font-semibold h-10 min-w-[113px] text-center text-sm"
                  shape="square"
                  color="indigo_900_cc"
                  size="sm"
                  variant="fill"
                >
                  {props?.nextEpoch}
                </Button>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.duration}
                    </Text>
                  </div>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.duration1}
                    </Text>
                  </div>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <div className="flex flex-col items-start justify-center w-auto">
                    <Text
                      className="text-base text-gray-100 w-auto"
                      size="txtBeVietnamProSemiBold16Gray100"
                    >
                      {props?.duration2}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 items-center justify-center w-full">
                <Input
                  name="frame1321314889_Two"
                  placeholder="Next Epoch"
                  className="!placeholder:text-gray-400 !text-gray-400 font-bevietnampro font-semibold md:h-auto p-0 sm:h-auto text-left text-sm w-full"
                  wrapClassName="w-full"
                  shape="square"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <Button
                    className="!text-blue_gray-50 cursor-pointer font-lexend text-base text-center w-full"
                    shape="round"
                    size="sm"
                    variant="gradient"
                    color="indigo_A400_indigo_A400_e5"
                  >
                    {props?.manage}
                  </Button>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <Button
                    className="!text-blue_gray-50 cursor-pointer font-lexend text-base text-center w-full"
                    shape="round"
                    size="sm"
                    variant="gradient"
                    color="indigo_A400_indigo_A400_e5"
                  >
                    {props?.manage1}
                  </Button>
                </div>
                <div className="bg-indigo-900_cc flex flex-col h-24 md:h-auto items-center justify-start px-4 py-3 w-full">
                  <Button
                    className="!text-blue_gray-50 cursor-pointer font-lexend text-base text-center w-full"
                    shape="round"
                    size="sm"
                    variant="gradient"
                    color="indigo_A400_indigo_A400_e5"
                  >
                    {props?.manage2}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

TableWallet02.defaultProps = {
  username: "Yourname",
  useraddress: "0x544...42865644",
  mission: "Mission",
  nfts: "NFTs",
  totalWhaleStaked: "Total Whale Staked",
  whalecounter: "1000 WHALE",
  price: "800$",
  whalecounter1: "1000 WHALE",
  price1: "800$",
  whalecounter2: "1000 WHALE",
  price2: "800$",
  frame1321314889: "Total Claimable Rewards:",
  totalclaimablerewards: "$15.000.000",
  price3: "$15.000.000",
  price4: "$15.000.000",
  frame1321314889one: "Unlock Date for Rewards",
  unlockdate: "March 23rd 2024, 7:00 am",
  unlockdate1: "March 23rd 2024, 7:00 am",
  unlockdate2: "March 23rd 2024, 7:00 am",
  nextEpoch: "Next Epoch",
  duration: "2 Hours",
  duration1: "2 Hours",
  duration2: "2 Hours",
  manage: "Manage",
  manage1: "Manage",
  manage2: "Manage",
};

export default TableWallet02;
