import DashboardLayout from '@mlem-admin/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';

import AdminNftTable from './AdminNftTable';
import ButtonCreateModal from './ButtonCreateModal';

const AdminNft = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display={'flex'} gap="10px">
          <Box>
            <ButtonCreateModal />
          </Box>
        </Box>
        <Box mt="2rem">
          <AdminNftTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminNft;
