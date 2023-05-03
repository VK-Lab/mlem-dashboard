import { useMemo } from 'react';

import { Box } from '@mui/material';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';

import { useGetAdminBenefitCategories } from '@/hooks/queries';
import { BenefitCategory } from '@/types/benefit-category';

const AdminBenefitTable = () => {
  const { data: { items = [] } = { items: [], total: 0 }, isLoading } =
    useGetAdminBenefitCategories();

  const columns = useMemo<MRT_ColumnDef<BenefitCategory>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
      },
      {
        accessorKey: 'name',
        header: 'Name',
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
        state={{ isLoading: isLoading }}
        muiTableContainerProps={{ sx: { maxHeight: '500px' } }}
      />
    </Box>
  );
};

export default AdminBenefitTable;
