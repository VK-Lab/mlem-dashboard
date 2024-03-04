import LayoutAdmin from '@mlem-admin/layouts/Admin';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import AdmBroker from '@mlem-admin/modules/AdmBroker';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmBroker/>
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
