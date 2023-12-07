import AdminTiers from '@mlem-admin/modules/AdminTiers';

type Props = {
  nftCollectionId: string;
};

const Index = ({ nftCollectionId }: Props) => {
  return <AdminTiers nftCollectionId={nftCollectionId} />;
};

export default Index;
