import { MintingMode } from '@mlem-admin/contracts/cep78';
import { DeployStatusEnum } from '@mlem-admin/enums';
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

  console.log('nftCollections: ', nftCollections);

  return (
    <AutocompleteElement
      multiple
      loading={isLoading}
      matchId
      label="Nft Collection"
      name={name}
      options={nftCollections
        .filter((nftCollection: NftCollection) => {
          if (nftCollection.mintingMode === MintingMode.Installer) {
            return false;
          }

          if (nftCollection.mintingMode === MintingMode.ACL) {
            if (!nftCollection.brokerId) {
              return false;
            }

            console.log(nftCollection.brokerDeployStatus);

            if (
              nftCollection.brokerDeployStatus !== DeployStatusEnum.COMPLETED
            ) {
              return false;
            }
          }

          return (
            !nftCollection.campaignId || nftCollection.campaignId === campaignId
          );
        })
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
