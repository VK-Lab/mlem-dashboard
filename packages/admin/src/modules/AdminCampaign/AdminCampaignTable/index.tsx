import { useMemo } from 'react';

import { useGetAllCampaigns } from '@mlem/admin/hooks/queries';
import { Campaign } from '@mlem/admin/types/campaign';
import { NftCollection } from '@mlem/admin/types/nft-collection';
import { Box, Chip } from '@mui/material';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import ButtonUpdateModal from './ButtonUpdateModal';

const AdminCampaignTable = () => {
  const { data: { items = [] } = { items: [], total: 0 }, isLoading } =
    useGetAllCampaigns();

  const columns = useMemo<MRT_ColumnDef<Campaign>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        maxSize: 20,
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
        accessorKey: 'nftCollections',
        header: 'NFT Collections',
        Cell: ({ row }) => {
          const nftCollections = _get(row, 'original.nftCollections');
          if (!nftCollections) {
            return '-';
          }

          return (
            <Box
              display={'flex'}
              gap={'4px'}
              component="div"
              sx={{ whiteSpace: 'normal' }}
            >
              {nftCollections.map((nftCollection: NftCollection) => {
                return (
                  <Chip
                    key={nftCollection.id}
                    label={nftCollection.name}
                    variant="outlined"
                  />
                );
              })}
            </Box>
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
        state={{
          isLoading: isLoading,
          columnPinning: {
            right: ['mrt-row-actions'],
            left: ['name'],
          },
        }}
        enableRowActions={true}
        renderRowActions={({ row }) => {
          return (
            <Box display="flex" gap="10px">
              <ButtonUpdateModal campaign={row.original} />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default AdminCampaignTable;
