import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmClaim from '@mlem-admin/modules/AdmClaim';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmClaim/>
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
