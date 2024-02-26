import AdmBenefitItemCreate from '@mlem-admin/modules/AdmBenefit/ItemCreate';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <AdmBenefitItemCreate />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
