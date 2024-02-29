import AdmNftCollectionItemCreate from '@mlem-admin/modules/AdmNftCollection/ItemCreateMix';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <AdmNftCollectionItemCreate />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
