import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmNftCollectionTiers from '@mlem-admin/modules/AdmNftCollection/components/ManageTiers';

type Props = {
  nftCollectionId: string;
};

const Index = ({nftCollectionId}: Props) => {
  return (
    <LayoutAdmin>
      <AdmNftCollectionTiers nftCollectionId={nftCollectionId}/>
    </LayoutAdmin>
  );
};

export const getServerSideProps = async ({locale, query}: {
  locale: string;
  query: { id: string };
}) => {
  const {id} = query;

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
