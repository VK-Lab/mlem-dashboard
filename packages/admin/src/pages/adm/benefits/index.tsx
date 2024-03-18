import LayoutAdmin from '@mlem-admin/layouts/Admin';
import AdmBenefit from '@mlem-admin/modules/AdmBenefit';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmBenefit />
    </LayoutAdmin>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
