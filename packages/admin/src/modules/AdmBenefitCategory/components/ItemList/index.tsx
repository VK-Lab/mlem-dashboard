import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import {Text} from '@mlem-admin/components/Text';

// import ItemUpdate from '@mlem-admin/modules/AdmBenefitCategory/components/ItemUpdate';
import dayjs from 'dayjs';
import {useGetAdminBenefitCategories} from '@mlem-admin/hooks/queries';
import {BenefitCategory} from '@mlem-admin/types/benefit-category';

const ItemList = () => {
  const {data: {items = []} = {items: [], total: 0}, isLoading} =
    useGetAdminBenefitCategories();

  return (
    <>
      <div className="overflow-x-scroll max-w-[1092px]">
        <Table removeWrapper isHeaderSticky
               className="!text-gray-400 flex-1 font-lexend p-[5px] bg-indigo-900"
               css={{
                 height: "auto",
                 minWidth: "100%",
               }}
        >
          <TableHeader>
            <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Created At</TableColumn>
            <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Benefit Category</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {(item: BenefitCategory) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div>
                    <div className="min-w-[100px]">{dayjs(item.createdAt).format('YYYY-MM-DD')}</div>
                    <div>{dayjs(item.createdAt).format('h:mm:ss A')}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex relative">
                    <div className="inline-block mr-2">
                      {/*<ItemUpdate benefitCategory={item}/>*/}
                    </div>
                    <div className="inline-block">
                      <div className="min-w-[200px]">{item.id}</div>
                      <div>{item.name}</div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ItemList;
