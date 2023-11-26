import Broker from '@mlem-admin/modules/Broker';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <Broker />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
