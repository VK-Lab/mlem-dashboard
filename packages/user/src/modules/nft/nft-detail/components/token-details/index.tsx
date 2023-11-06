import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mlem-user/components/ui/accordion";
import { NFT } from "@mlem-user/types/nft";
import _ from "lodash-es";

import { TokenAttribute } from "./token-attribute";

const ADDITIONAL_INFORMATIONS = [
  {
    title: "Contract Package Hash",
    key: "contractPackageHash",
  },
  {
    title: "Contract Address",
    key: "tokenAddress",
  },
  {
    title: "Token ID",
    key: "tokenId",
  },
  {
    title: "Token Standard",
    key: "tokenStandard",
  },
  {
    title: "Token Type",
    key: "tokenType",
  },
  {
    title: "Tier",
    key: "tier.name",
  },
];

type TokenDetailsProps = {
  className?: string;
  nft?: NFT;
};

export const TokenDetails = ({ nft }: TokenDetailsProps) => {
  const details = ADDITIONAL_INFORMATIONS.filter((item) =>
    _.get(nft, item.key)
  );

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger>Token Details</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            {details.map((item, index) => {
              return (
                <TokenAttribute
                  key={index}
                  name={item.title}
                  value={_.get(nft, item.key)}
                />
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
