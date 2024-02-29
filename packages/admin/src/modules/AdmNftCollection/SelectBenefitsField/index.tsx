import { useGetBenefits } from '@mlem-admin/hooks/queries';
import { Benefit } from '@mlem-admin/types/benefit';
import { AutocompleteElement } from 'react-hook-form-mui';

type Props = {
  name: string;
};

const SelectBenefitsField = ({ name }: Props) => {
  const {
    data: { items: benefits = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();

  return (
    <AutocompleteElement
      loading={isLoadingBenefits}
      // label="Benefits"
      multiple
      matchId
      name={name}
      options={benefits.map((item: Benefit) => {
        return {
          id: item.id,
          label: item.name,
        };
      })}
    />
  );
};

export default SelectBenefitsField;
