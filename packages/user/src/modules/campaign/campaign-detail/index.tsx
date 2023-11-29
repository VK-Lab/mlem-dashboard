"use client";
import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import { Button } from "@mlem-user/components/ui/button";
import { SpinLoader } from "@mlem-user/components/ui/spin-loader";
import { formatDate } from "@mlem-user/lib/date";
import { cn } from "@mlem-user/lib/utils";
import { ButtonConnect } from "@mlem-user/modules/core/button-connect";
import { NFTMinter } from "@mlem-user/modules/core/nft-minter";
import { useGetCampaign } from "@mlem-user/services/app/campaign/hooks/useGetCampaign";
import dayjs from "dayjs";
import { Space_Grotesk } from "next/font/google";
import Markdown from "react-markdown";

import WhiteListForm from "./WhiteListForm";

type CampaignDetailProps = {
  campaignId: string;
};

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
});
export const CampaignDetail = ({ campaignId }: CampaignDetailProps) => {
  const { data, isLoading } = useGetCampaign(campaignId);
  const { publicKey } = useAccount();

  const isFinishedCampaign = useMemo(() => {
    if (data?.endDate) {
      return dayjs().isAfter(dayjs(data?.endDate));
    }

    return false;
  }, [data]);

  const nftCollection = useMemo(() => {
    if (!data?.nftCollections) {
      return;
    }

    return data?.nftCollections[0];
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
          minHeight: "65vh",
        }}
        className="bg-campaign"
      >
        <div className="md:w-2/5 px-2 py-6 md:py-12 md:px-3 md:pl-6  md:justify-center md:flex md:flex-col">
          <div>
            <div className="shadow-md">
              <img src={data?.imageUrl} />
            </div>
          </div>
        </div>
        <div className="md:w-3/5 px-2 md:px-16 text-gray-50 pb-12 pt-12 md:justify-center md:flex md:flex-col">
          <div>
            <div className="max-w-2xl">
              <h1
                className={cn(font.className, "font-bold text-2xl md:text-5xl")}
              >
                {data?.name}
              </h1>
              <h2 className={cn(font.className, "font-light text-lg mt-2")}>
                {data?.shortDescription}
              </h2>
              <div className="mb-3">
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
              <div className="text-sm description max-w-xl">
                <Markdown className="markdown--wrapper text-gray-300">
                  {data?.description}
                </Markdown>
              </div>
            </div>
            <div className="mt-7 mb-12">
              {data?.isOpenWhitelist && (
                <>
                  <div className="max-w-md progressbar-wrapper">
                    <div className="relative pt-1">
                      <div className="flex mb-1 items-center justify-center">
                        <div className="text-center">
                          <span className="text-xs font-semibold inline-block text-gray-200">
                            70 / 99
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
                  <div className="max-w-xl grid gap-1 grid-cols-3 mb-4">
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
                      <div className="px-0 py-1">
                        <dl>
                          <dt className="text-sm min-h-[40px] md:min-h-0 leading-5 text-gray-100 font-medium">
                            Max entry per Wallet
                          </dt>
                          <dd className="mt-1 h-12 text-gray-50 text-4xl md:text-5xl leading-none font-semibold">
                            1
                          </dd>
                        </dl>
                      </div>
                    </div>
                    <div className="">
                      <div className="px-0 py-1">
                        <dl>
                          <dt className="text-sm min-h-[40px] md:min-h-0 leading-5 text-gray-100 font-medium">
                            Price
                          </dt>
                          <dd className="mt-1 h-12 text-gray-50 text-xl md:text-2xl leading-none font-semibold items-center flex">
                            299 CSPR
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            {!publicKey ? (
              <ButtonConnect
                className="px-8 h-12"
                buttonText="Connect Wallet"
              />
            ) : (
              <>
                {data?.isOpenWhitelist ? (
                  <WhiteListForm campaignId={campaignId} />
                ) : (
                  <>
                    {isFinishedCampaign ? (
                      <Button disabled className="disabled px-8 h-12">
                        Campaign ended
                      </Button>
                    ) : (
                      <div>
                        <NFTMinter nftCollection={nftCollection} />
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center"></div>
    </div>
  );
};
