import React, { useMemo } from 'react';

import { useGetTiersByNftCollection } from '@mlem-admin/hooks/queries/useGetTiersByNftCollection';
import { Benefit } from '@mlem-admin/types/benefit';
import { Tier } from '@mlem-admin/types/tier';
import { Box, Chip } from '@mui/material';
import dayjs from 'dayjs';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';

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
        accessorKey: 'slug',
        header: 'Slug',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'benefits',
        header: 'Benefits',
        maxSize: 100,
        Cell: ({ row }) => {
          const { benefits: tierBenefits } = row.original;

          return (
            <Box display={'flex'} gap={'4px'} flexWrap={'wrap'}>
              {tierBenefits?.map((benefit: Benefit) => (
                <Chip
                  key={`benefit-${benefit.id}`}
                  label={benefit.name}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          );
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 220,
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
        initialState={{
          columnVisibility: {
            description: false,
            createdAt: false,
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
