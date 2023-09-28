import DashboardLayout from '@mlem/admin/layouts/DashboardLayout';
import { Container } from '@mui/material';

import AdminClaimTable from './AdminClaimTable';

const AdminHome = () => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <AdminClaimTable />
      </Container>
    </DashboardLayout>
  );
};

export default AdminHome;
