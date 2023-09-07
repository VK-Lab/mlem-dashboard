import { useMemo } from 'react';

import { Box } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';
import { useGetTiersByNftCollection } from '@/hooks/queries/useGetTiersByNftCollection';
import { Tier } from '@/types/tier';

type Props = {
  nftCollectionId: string;
};

const AdminTierTable = ({ nftCollectionId }: Props) => {
  const { data: { items = [] } = { items: [] }, isLoading } =
    useGetTiersByNftCollection({
      nftCollectionId,
    });

  const columns = useMemo<MRT_ColumnDef<Tier>[]>(
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
            left: ['id'],
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Actions', //change header text
            size: 220, //make actions column wider
          },
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          return (
            <Box display="flex" gap="10px">
              <ButtonUpdateModal tier={row.original} />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminTierTable;
