import { useMemo } from 'react';

import { Box, Chip } from '@mui/material';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';
import { useGetAllNftCollections } from '@/hooks/queries/useGetAllNftCollections';
import ButtonViewTiers from '@/modules/AdminNftCollection/AdminNftCollectionTable/ButtonViewTiers';
import { NftCollection } from '@/types/nft-collection';
import { mapDeployStatus } from '@/utils/status';

const AdminNftCollectionTable = () => {
  const { data: { items = [] } = { items: [] }, isLoading } =
    useGetAllNftCollections();

  const columns = useMemo<MRT_ColumnDef<NftCollection>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'tokenAddress',
        header: 'Token Address',
      },
      {
        accessorKey: 'contractType',
        header: 'Contract Type',
      },
      {
        accessorKey: 'deployHash',
        header: 'Deploy Hash',
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
              color={mapDeployStatus(deployStatus)}
              variant="outlined"
            />
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        Cell: ({ row }) => (
          <Box component="div" sx={{ whiteSpace: 'normal' }}>
            {dayjs(row.original.createdAt).format('YYYY-MM-DD h:mm:ss A')}
          </Box>
        ),
        size: 200,
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
        initialState={{
          columnVisibility: {
            id: false,
            deployHash: false,
            contractType: false,
            tokenAddress: false,
            createdAt: false,
          },
        }}
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
            size: 300, //make actions column wider
          },
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          return (
            <Box display="flex" gap="10px">
              <ButtonUpdateModal nftCollection={row.original} />
              <ButtonViewTiers nftCollectionId={row.original.id} />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminNftCollectionTable;
