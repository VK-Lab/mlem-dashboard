import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmBenefitCategory from '@mlem-admin/modules/AdmBenefitCategory';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmBenefitCategory/>
    </LayoutAdmin>
  );
};

export const getStaticProps = async ({locale}: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
