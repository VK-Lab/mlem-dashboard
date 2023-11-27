"use client";
import { useMemo } from "react";

import { Button } from "@mlem-user/components/ui/button";
import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { formatDate } from "@mlem-user/lib/date";
import { useGetCampaign } from "@mlem-user/services/app/campaign/hooks/useGetCampaign";
import cn from "classnames";
import dayjs from "dayjs";
import { Space_Grotesk } from "next/font/google";

type CampaignDetailProps = {
  campaignId: string;
};

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
});
export const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data, isLoading } = useGetCampaign(campaignId);

  const isFinishedCampaign = useMemo(() => {
    if (data?.endDate) {
      return dayjs(data?.endDate).isAfter(dayjs());
    }

    return false;
  }, [data]);

  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          minHeight: "75vh",
        }}
        className="relative flex flex-col md:flex-row align-center mb-10 
        bg-gradient-to-b from-red-900 to-stone-900 
        before:absolute 
        before:bg-gradient-to-b before:from-red-900 before:to-stone-900
        before:w-full before:h-full before:left-full before:top-0
        after:absolute after:bg-gradient-to-b after:from-red-900 after:to-stone-900 after:w-full after:h-full after:right-100 after:top-0 after:right-full"
      >
        <div className="md:w-2/5 px-2 py-6 md:py-12 md:px-3 md:pl-6  md:justify-center md:flex md:flex-col">
          <div>
            <div className="shadow-md">
              <img src={data?.imageUrl} />
            </div>
          </div>
        </div>
        <div className="md:w-3/5 text-center px-6 text-gray-50 pb-12 pt-12 md:justify-center md:flex md:flex-col">
          <div>
            <div className="max-w-2xl mx-auto">
              <h1
                className={cn(font.className, "font-bold text-2xl md:text-5xl")}
              >
                {data?.name}
              </h1>
              <h2 className={cn(font.className, "font-light text-lg mt-2")}>
                Where Royalty Revives Hand-Drawn NFT Greatness!
              </h2>
              <div className="text-center">
                <h5
                  className="my-4 rounded p-2 px-4 inline-block mx-auto"
                  style={{
                    backgroundColor: "#A60001",
                  }}
                >
                  {formatDate(data?.startDate, "MMMM D, YYYY")} -{" "}
                  {formatDate(data?.endDate, "MMMM D, YYYY")}
                </h5>
              </div>
              <div className="text-sm description max-w-xl mx-auto">
                <p className="text-gray-300">{data?.description}</p>
                {/* <p>{data?.description}</p> */}
              </div>
            </div>
            <div className="mt-7 mb-12">
              <div className="mx-auto max-w-md progressbar-wrapper">
                <div className="relative pt-1">
                  <div className="flex mb-1 items-center justify-center">
                    <div className="text-center">
                      <span className="text-xs font-semibold inline-block text-gray-200">
                        0 / 99
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                    <div
                      style={{ width: "70%" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-700-X bg-gradient-to-r from-yellow-300 to-pink-600"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mx-auto max-w-xl grid gap-1 grid-cols-3 mb-4">
                <div className="">
                  <div className="px-4 py-1">
                    <dl>
                      <dt className="text-sm leading-5 text-gray-100 font-medium">
                        Total Supply
                      </dt>
                      <dd className="mt-1 h-12 text-gray-50 text-5xl leading-none font-semibold">
                        99
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="">
                  <div className="px-4 py-1">
                    <dl>
                      <dt className="text-sm leading-5 text-gray-100 font-medium">
                        Max entry per Wallet
                      </dt>
                      <dd className="mt-1 h-12 text-gray-50 text-5xl leading-none font-semibold">
                        3
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="">
                  <div className="px-4 py-1">
                    <dl>
                      <dt className="text-sm leading-5 text-gray-100 font-medium">
                        Price
                      </dt>
                      <dd className="mt-1 h-12 text-gray-50 text-2xl leading-none font-semibold items-center flex">
                        1,500 CSPR
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            {!isFinishedCampaign ? (
              <Button disabled className="disabled px-8 h-12">
                Campaign ended
              </Button>
            ) : (
              <div>
                <Button className="px-8 h-12">Connect Wallet</Button>
              </div>
            )}

            {/* 
            TODO:
              Show email register after connecting wallet
            <div>
              <span className="sm:flex justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email Address"
                  required
                  className="bg-transparent border-grey-500 border-2 mb-2 mr-2 placeholder:italic placeholder-gray-50 py-1 px-2 text-grey[500] h-12 w-64 sm:mb-0 rounded"
                />
                <Button className="w-32 h-12">Register</Button>
              </span>
            </div>
            */}
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center">
        {/* <div className="relative h-[520px] w-full">
          <Image src={data?.imageUrl || ""} fill={true} alt="Campaign Image" />p
        </div>
        <h3 className="mt-8 typo-h3">{data?.name}</h3>
        <div className="mt-4 text-center">{data?.description}</div>
        <div className="mt-4">
          {formatDate(data?.startDate)} - {formatDate(data?.endDate)}
        </div>
        <div>
          {data?.type === CampaignTypesEnum.FREE_MINT &&
            data?.status === CampaignStatusEnum.RUNNING &&
            data?.nftCollections && (
              <div className="mt-4 flex gap-4">
                {data.nftCollections.map((nftCollection) => (
                  <div key={nftCollection.id}>
                    <NFTMinter nftCollection={nftCollection} />
                  </div>
                ))}
              </div>
            )}
        </div>
         */}
      </div>
    </div>
  );
};
