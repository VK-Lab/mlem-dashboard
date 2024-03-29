import { useGetBenefits } from '@mlem-admin/hooks/queries';
import { Benefit } from '@mlem-admin/types/benefit';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import dayjs from 'dayjs';

const ItemList = () => {
  const { data: { items = [] } = { items: [], total: 0 } } = useGetBenefits();

  return (
    <>
      <Table
        removeWrapper
        isHeaderSticky
        className="!text-gray-400 flex-1 font-lexend p-[5px] bg-indigo-900 overflow-x-scroll"
      >
        <TableHeader>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Created At
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Benefit
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Category
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Amount Percentage
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Description
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: Benefit) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <div className="min-w-[100px]">
                    {dayjs(item.createdAt).format('YYYY-MM-DD')}
                  </div>
                  <div>{dayjs(item.createdAt).format('h:mm:ss A')}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex relative">
                  <div className="inline-block mr-2">
                    {/*<ItemUpdate benefit={item}/>*/}
                  </div>
                  <div className="inline-block">
                    <div className="min-w-[200px]">{item.id}</div>
                    <div>{item.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.category?.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.amount || 0} %</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.description}</div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ItemList;
