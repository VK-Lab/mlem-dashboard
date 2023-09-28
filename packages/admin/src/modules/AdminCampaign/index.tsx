import DashboardLayout from '@mlem/admin/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';

import AdminCampaignTable from './AdminCampaignTable';
import ButtonCreateModal from './ButtonCreateModal';

const AdminCampaign = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display={'flex'} gap="10px">
          <Box>
            <ButtonCreateModal />
          </Box>
        </Box>
        <Box mt="2rem">
          <AdminCampaignTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminCampaign;
