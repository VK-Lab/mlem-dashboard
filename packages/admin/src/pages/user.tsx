import UserCollection from '@mlem/admin/modules/UserCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return <UserCollection />;
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default Index;
