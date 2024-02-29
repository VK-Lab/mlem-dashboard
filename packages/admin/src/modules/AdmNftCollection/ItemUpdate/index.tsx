import {BsPencil} from "react-icons/bs";
import { useState } from 'react'
import {MintingMode} from '@mlem-admin/contracts/cep78';

import AdmNftCollectionItemUpdateInfo from "@mlem-admin/modules/AdmNftCollection/ItemUpdate/Info";
import AdmNftCollectionItemUpdateTierList from "@mlem-admin/modules/AdmNftCollection/ItemUpdate/TierList";
import AdmNftCollectionItemUpdateTierCreate from "@mlem-admin/modules/AdmNftCollection/ItemUpdate/TierCreate";
import AdmNftCollectionItemUpdateBroker from "@mlem-admin/modules/AdmNftCollection/ItemUpdate/Broker";
import {Button} from "@mlem-admin/components/Button";

const AdmNftCollectionItemUpdate = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="absolute -right-1 -top-1 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center w-[26px] p-[5px] rounded bg-indigo-500">
        <BsPencil />
      </Button>

      <div className={`absolute -right-1 top-6 bg-gray-300 rounded w-auto ${
        open
          ? "opacity-100 h-auto"
          : "opacity-0 h-0 transition-all duration-200"
      }`}>
        <AdmNftCollectionItemUpdateInfo item={props.item}/>
        <AdmNftCollectionItemUpdateTierList item={props.item}/>
        <AdmNftCollectionItemUpdateTierCreate item={props.item}/>
        {props.item.mintingMode == MintingMode.ACL && (
          <AdmNftCollectionItemUpdateBroker item={props.item}/>
        )}
      </div>
    </>
  );
};

export default AdmNftCollectionItemUpdate;
