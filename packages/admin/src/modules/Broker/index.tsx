import DashboardLayout from '@mlem-admin/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';

import AdminNftCollectionTable from './BrokerTable';
import ButtonCreateModal from './ButtonCreateModal';

const Broker = () => {
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

export default Broker;
