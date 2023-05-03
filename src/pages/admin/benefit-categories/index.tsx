import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AdminBenefitCategory from '@/modules/AdminBenefitCategory';

const Index = () => {
  return <AdminBenefitCategory />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
