import LayoutAdmin from '@mlem-admin/layouts/Admin';
import AdmCreateCampaignStepNftCollection from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/StepNftCollection';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmCreateCampaignStepNftCollection />
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
