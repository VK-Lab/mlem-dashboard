import { useState } from 'react';

import ItemUpdateInfo from '@mlem-admin/modules/AdmNftMint/components/ItemUpdateInfo';
import { generateMetadataUrl } from '@mlem-admin/utils/metadata';
import Link from 'next/link';
import { BsPencil } from 'react-icons/bs';

const ItemUpdate = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="absolute -right-1 -top-1 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center w-[26px] p-[5px] rounded bg-indigo-500"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsPencil />
      </button>

      <div
        className={`absolute -right-1 top-6 bg-gray-300 rounded w-auto ${
          open
            ? 'opacity-100 h-auto'
            : 'opacity-0 h-0 transition-all duration-200'
        }`}
      >
        <ItemUpdateInfo item={props.item} />

        <div className="px-1 py-1 cursor-pointer hover:text-white-A700 hover:bg-gray-500">
          <Link
            href={generateMetadataUrl(props.item._id)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <button type="button">Metadata</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ItemUpdate;
