import DashboardLayout from '@mlem-admin/layouts/DashboardLayout';
import { Box, Container } from '@mui/material';

import AdminBenefitCategoryTable from './AdminBenefitCategoryTable';
import ButtonCreateModal from './ButtonCreateModal';

const AdminBenefitCategory = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box mt="2rem">
          <Box>
            <ButtonCreateModal />
          </Box>
          <AdminBenefitCategoryTable />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminBenefitCategory;
