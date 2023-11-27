import { useMemo } from 'react';

import { useGetBrokers } from '@mlem-admin/hooks/queries/useGetBrokers';
import { Broker } from '@mlem-admin/types/broker';
import { mapDeployStatus } from '@mlem-admin/utils/status';
import { Box, Chip } from '@mui/material';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';

const BrokerTable = () => {
  const { data: { items = [] } = { items: [] }, isLoading } = useGetBrokers();

  const columns = useMemo<MRT_ColumnDef<Broker>[]>(
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
        accessorKey: 'contractHash',
        header: 'Contract Hash',
      },
      {
        accessorKey: 'contractPackageHash',
        header: 'Contract Package Hash',
      },
      {
        accessorKey: 'deployHash',
        header: 'Deploy Hash',
      },
      {
        accessorKey: 'deployStatus',
        header: 'Deploy Status',
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
            contractHash: false,
            contractPackageHash: false,
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
              <ButtonUpdateModal broker={row.original} />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default BrokerTable;
