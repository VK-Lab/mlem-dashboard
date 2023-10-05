import Welcome from '@mlem-admin/modules/Welcome';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <Welcome />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
