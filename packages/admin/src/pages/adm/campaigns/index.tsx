import AdmDashboard from '@mlem-admin/modules/AdmDashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <AdmDashboard />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
