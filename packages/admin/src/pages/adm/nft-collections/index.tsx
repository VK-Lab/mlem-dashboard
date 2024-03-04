import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmNftCollection from '@mlem-admin/modules/AdmNftCollection';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmNftCollection/>
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
