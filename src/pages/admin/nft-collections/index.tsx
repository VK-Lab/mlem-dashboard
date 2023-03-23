import { ThirdwebProvider } from '@thirdweb-dev/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Config } from '@/config';
import AdminNftCollection from '@/modules/AdminNftCollection';

const Index = () => {
  return (
    <ThirdwebProvider desiredChainId={Config.chainId}>
      <AdminNftCollection />
    </ThirdwebProvider>
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
