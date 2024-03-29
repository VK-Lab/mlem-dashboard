import { useMemo } from 'react';

import ToastMessage from '@mlem-admin/components/Toast';
import { useGetAdminNfts } from '@mlem-admin/hooks/queries';
import { Nft } from '@mlem-admin/types/nft';
import { generateMetadataUrl } from '@mlem-admin/utils/metadata';
// import { mapDeployStatus } from '@mlem-admin/utils/status';
import { Box, Button, Chip } from '@mui/material';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';

const AdminNftTable = () => {
  const { data: { items = [] } = { nfts: [], total: 0 }, isLoading } =
    useGetAdminNfts();

  const handleCopy = (nft: Nft) => {
    const url = generateMetadataUrl(nft._id);

    copy(url);

    ToastMessage({
      type: 'success',
      message: 'Copied',
    });
  };

  const columns = useMemo<MRT_ColumnDef<Nft>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'tokenId',
        header: 'Token Id',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'imageUrl',
        header: 'Image URL',
      },
      {
        accessorKey: 'tokenAddress',
        header: 'Token Address',
      },
      {
        accessorKey: 'deployHash',
        header: 'Deploy Hash',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ row }) => (
          <Box component="div" sx={{ whiteSpace: 'normal' }}>
            {dayjs(row.original.createdAt).format('YYYY-MM-DD h:mm:ss A')}
          </Box>
        ),
        size: 220,
      },
      {
        accessorKey: 'deployStatus',
        header: 'Deploy Status',
        size: 220,
        Cell: ({ row }) => {
          const { deployStatus } = row.original;

          return (
            <Chip
              label={deployStatus}
              // color={mapDeployStatus(deployStatus)}
              variant="outlined"
            />
          );
        },
      },
    ],
    []
  );

  return (
    <Box mt="2rem">
      <MaterialReactTable
        columns={columns}
        data={items}
        positionActionsColumn={'last'}
        muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
        state={{
          isLoading: isLoading,
          columnPinning: {
            right: ['deployStatus', 'mrt-row-actions'],
            left: ['name'],
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Actions', //change header text
            size: 100, //make actions column wider
          },
        }}
        enablePinning={true}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          return (
            <Box display="flex" gap="10px">
              <ButtonUpdateModal nft={row.original} />
              <Box minWidth="80px">
                <Button
                  variant="outlined"
                  onClick={() => handleCopy(row.original)}
                >
                  Metadata
                </Button>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminNftTable;
