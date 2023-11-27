import { useGetPublicNftCollections } from '@mlem-admin/hooks/queries/useGetPublicNftCollections';
import { NftCollection } from '@mlem-admin/types/nft-collection';
import { AutocompleteElement } from 'react-hook-form-mui';

type Props = {
  name: string;
  campaignId?: string;
};

const SelectNftCollectionsField = ({ name, campaignId }: Props) => {
  const {
    data: { items: nftCollections = [] } = { items: [], total: 0 },
    isLoading,
  } = useGetPublicNftCollections();

  return (
    <AutocompleteElement
      multiple
      loading={isLoading}
      matchId
      label="Nft Collections"
      name={name}
      options={nftCollections
        .filter(
          (nftCollection: NftCollection) =>
            !nftCollection.campaignId || nftCollection.campaignId === campaignId
        )
        .map((item: NftCollection) => {
          return {
            id: item.id,
            label: item.name,
          };
        })}
    />
  );
};

export default SelectNftCollectionsField;
