import { useMemo } from "react";

import { useAccount } from "@casperdash/usewallet";
import { Space_Grotesk } from "next/font/google";
import Markdown from "react-markdown";

import { Button } from "@mlem-user/components/ui/button";
import { CampaignStatusEnum } from "@mlem-user/enums/campaign-status";
import { useGetTotalTokenSupply } from "@mlem-user/hooks/contract/useGetTotalTokenSupply";
import { formatDate } from "@mlem-user/lib/date";
import { cn } from "@mlem-user/lib/utils";
import { ButtonConnect } from "@mlem-user/modules/@core/button-connect";
import { NFTMinter } from "@mlem-user/modules/@core/nft-minter";
import { useGetCampaign } from "@mlem-user/services/app/campaign/hooks/useGetCampaign";
import { useGetTotalNFTs } from "@mlem-user/services/app/nft-collection/hooks/use-get-total-nfts";

import WhiteListForm from "./whitelist-form";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
});

type Props = {
  campaignId: string;
};

export const CampaignInformation = ({ campaignId }: Props) => {
  const { data } = useGetCampaign(campaignId);
  const { publicKey } = useAccount();

  const nftCollection = useMemo(() => {
    if (!data?.nftCollections) {
      return;
    }

    return data?.nftCollections[0];
  }, [data]);

  const { data: totalTokensOnChain = 0 } = useGetTotalTokenSupply(
    nftCollection?.tokenAddress
      ? `hash-${nftCollection?.tokenAddress}`
      : undefined
  );

  const { data: totalTokensOffChain = 0 } = useGetTotalNFTs(
    nftCollection?.contractPackageHash
  );

  const totalNFTs = totalTokensOnChain || totalTokensOffChain;

  return (
    <>
      <div className="max-w-2xl mb-12">
        <h1 className={cn(font.className, "font-bold text-2xl md:text-5xl")}>
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
        {data?.status === CampaignStatusEnum.RUNNING && (
          <>
            <div className="max-w-md progressbar-wrapper">
              <div className="relative pt-1">
                <div className="flex mb-1 items-center justify-center">
                  <div className="text-center">
                    <span className="text-xs font-semibold inline-block text-gray-200">
                      {totalNFTs} / {nftCollection?.totalTokenSupply}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{
                      width: `${
                        (totalNFTs / (nftCollection?.totalTokenSupply || 1)) *
                        100
                      }%`,
                    }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-700-X bg-gradient-to-r from-yellow-300 to-pink-600"
                  ></div>
                </div>
              </div>
            </div>
            {nftCollection?.broker && (
              <>
                <div className="max-w-xl grid gap-1 grid-cols-3 mb-4 margin-auto">
                  <div className="">
                    <div className="px-4 py-1">
                      <dl>
                        <dt className="text-sm leading-5 text-gray-100 font-medium">
                          Total Supply
                        </dt>
                        <dd className="mt-1 h-12 text-gray-50 text-5xl leading-none font-semibold">
                          {nftCollection?.totalTokenSupply}
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
                          {nftCollection?.broker.maxOwnedTokens}
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="">
                    <div className="px-0 py-1">
                      <dl>
                        <dt className="text-sm min-h-[40px] md:min-h-0 leading-5 text-gray-100 font-medium">
                          Price (CSPR)
                        </dt>
                        <dd className="mt-1 h-12 text-gray-50 text-4xl md:text-5xl leading-none font-semibold">
                          {nftCollection?.broker.mintingFee}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {totalNFTs >= (nftCollection?.totalTokenSupply || 999999) ? (
        <div className="h-[72px]">SOLD OUT. Thanks for your support.</div>
      ) : (
        <>
          {!publicKey ? (
            <ButtonConnect
              className="px-8 h-12 w-[160px]"
              buttonText="Connect Wallet"
            />
          ) : (
            <>
              {data?.isOpenWhitelist ? (
                <WhiteListForm campaignId={campaignId} />
              ) : (
                <>
                  {data?.status === CampaignStatusEnum.ENDED ? (
                    <Button disabled className="disabled px-8 h-12">
                      Campaign ended
                    </Button>
                  ) : (
                    <div>
                      <NFTMinter
                        nftCollection={nftCollection}
                        campaignId={campaignId}
                        isAllowWhitelistUser={data?.isAllowWhitelistUser}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
