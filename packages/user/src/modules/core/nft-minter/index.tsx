"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@mlem-user/components/ui/card";
import { NftCollection } from "@mlem-user/types/nft-collection";
import { cn } from "@mlem-user/utils";
import Image from "next/image";

import { ButtonMint } from "./button-mint";

type NFTMinterProps = {
  className?: string;
  nftCollection?: NftCollection;
};

export const NFTMinter = ({ className, nftCollection }: NFTMinterProps) => {
  if (!nftCollection) {
    return null;
  }

  return (
    <Card className={cn("w-[320px]", className)}>
      <CardHeader className="relative h-[240px]">
        <Image
          src={nftCollection?.nftImageUrl || ""}
          fill={true}
          alt="Campaign Image"
          className="p-2 rounded-xl"
        />
      </CardHeader>
      <CardContent className="mt-4">
        <CardTitle className="line-clamp-1 text-center">
          {nftCollection?.name}
        </CardTitle>
        <CardDescription className="mt-2 truncate line-clamp-2 text-ellipsis overflow-hidden text-center">
          <p>{nftCollection?.description}</p>
        </CardDescription>
        <CardFooter className="flex justify-center mt-10">
          {nftCollection && (
            <ButtonMint
              params={{
                name: nftCollection.name,
                description: nftCollection.description,
                contractPackageHash: nftCollection.contractPackageHash,
                imageUrl: nftCollection.nftImageUrl,
                tokenAddress: nftCollection.tokenAddress,
                broker: nftCollection.broker,
              }}
            />
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
};
