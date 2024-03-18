import { useGetTiersByNftCollection } from '@mlem-admin/hooks/queries/useGetTiersByNftCollection';
import { Tier } from '@mlem-admin/types/tier';
import { AutocompleteElement } from 'react-hook-form-mui';

type Props = {
  name: string;
  nftCollectionId?: string;
};

const FormTiers = ({ name, nftCollectionId }: Props) => {
  const {
    data: { items: tiers = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetTiersByNftCollection({
    nftCollectionId: nftCollectionId,
    limit: 1000,
  });

  return (
    <AutocompleteElement
      loading={isLoadingBenefits}
      // label="Tiers"
      matchId
      name={name}
      options={tiers.map((item: Tier) => {
        return {
          id: item.id,
          label: item.name,
        };
      })}
    />
  );
};

export default FormTiers;
