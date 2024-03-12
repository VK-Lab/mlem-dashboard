import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmNftMint from '@mlem-admin/modules/AdmNftMint';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmNftMint/>
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
