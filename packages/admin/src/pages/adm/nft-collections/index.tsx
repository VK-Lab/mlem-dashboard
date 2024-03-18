import LayoutAdmin from '@mlem-admin/layouts/Admin';
import AdmNftCollection from '@mlem-admin/modules/AdmNftCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmNftCollection />
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
