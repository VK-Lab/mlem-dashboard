import LayoutAdmin from '@mlem-admin/layouts/Admin';
import AdmCreateCampaignStepCampaign from '@mlem-admin/modules/AdmDashboard/components/ItemCreate/StepCampaign';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Index = () => {
  return (
    <LayoutAdmin>
      <AdmCreateCampaignStepCampaign />
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
