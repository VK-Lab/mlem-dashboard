'use client';

import { Box, Container } from '@mui/material';

import AdminTierTable from './AdminTierTable';
import ButtonCreateModal from './ButtonCreateModal';
import DashboardLayout from '@/layouts/DashboardLayout';

type Props = {
  nftCollectionId: string;
};

const AdminTiers = ({ nftCollectionId }: Props) => {
  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box>
          <ButtonCreateModal nftCollectionId={nftCollectionId} />
        </Box>
        <Box mt="2rem">
          <AdminTierTable nftCollectionId={nftCollectionId} />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default AdminTiers;
