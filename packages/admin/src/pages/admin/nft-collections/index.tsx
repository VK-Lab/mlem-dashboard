import AdminNftCollection from '@mlem/admin/modules/AdminNftCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <AdminNftCollection />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
