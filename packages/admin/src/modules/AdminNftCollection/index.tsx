import DashboardLayout from '@mlem/admin/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';

import AdminNftCollectionTable from './AdminNftCollectionTable';
import ButtonCreateModal from './ButtonCreateModal';

const AdminNftCollection = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box>
          <ButtonCreateModal />
        </Box>
        <Box mt="2rem">
          <AdminNftCollectionTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminNftCollection;
