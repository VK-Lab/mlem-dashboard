import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@mlem-user/components/ui/accordion";

import { NFTAttribute } from "./nft-attribute";

export const NFTAttributes = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Attributes</AccordionTrigger>
        <AccordionContent>
          <NFTAttribute name="Name" value="NFT Name" />
          <NFTAttribute name="Description" value="NFT Description" />
          <NFTAttribute name="Owner" value="NFT Owner" />
          <NFTAttribute name="Creator" value="NFT Creator" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
