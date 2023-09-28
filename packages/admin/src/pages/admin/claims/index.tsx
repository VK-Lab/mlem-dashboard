import AdminHome from '@mlem/admin/modules/AdminHome';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <AdminHome />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
