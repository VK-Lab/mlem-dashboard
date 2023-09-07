import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminTiers from '@/modules/AdminTiers';

type Props = {
  nftCollectionId: string;
};

const Index = ({ nftCollectionId }: Props) => {
  return <AdminTiers nftCollectionId={nftCollectionId} />;
};

export const getServerSideProps = async ({
  locale,
  query,
}: {
  locale: string;
  query: { id: string };
}) => {
  const { id } = query;

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      nftCollectionId: id,
      params: {
        id,
      },
    },
  };
};

export default Index;
