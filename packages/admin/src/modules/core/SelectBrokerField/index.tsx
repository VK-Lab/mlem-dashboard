import { DeployStatusEnum } from '@mlem-admin/enums';
import { useGetBrokers } from '@mlem-admin/hooks/queries/useGetBrokers';
import { Broker } from '@mlem-admin/types/broker';
import { AutocompleteElement } from 'react-hook-form-mui';

type Props = {
  name: string;
  label?: string;
  campaignId?: string;
};

const SelectBrokerField = ({ name, label = 'Broker' }: Props) => {
  const { data: { items: brokers = [] } = { items: [], total: 0 }, isLoading } =
    useGetBrokers();

  return (
    <AutocompleteElement
      loading={isLoading}
      matchId
      label={label}
      name={name}
      options={brokers
        .filter(
          (broker: Broker) => broker.deployStatus === DeployStatusEnum.COMPLETED
        )
        .map((item: Broker) => {
          return {
            id: item.id,
            label: item.name,
          };
        })}
    />
  );
};

export default SelectBrokerField;
