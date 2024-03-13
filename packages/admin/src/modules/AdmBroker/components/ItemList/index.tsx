'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import {Text} from '@mlem-admin/components/Text';

import ItemUpdate from '@mlem-admin/modules/AdmBroker/components/ItemUpdate';

import dayjs from 'dayjs';
import {useGetBrokers} from '@mlem-admin/hooks/queries/useGetBrokers';
import {Broker} from '@mlem-admin/types/broker';
import {mapDeployStatus} from '@mlem-admin/utils/status';

const ItemList = () => {
  const {data: {items = []} = {items: []}, isLoading} = useGetBrokers();

  return (
    <>
      <Table removeWrapper isHeaderSticky
             className="!text-gray-400 flex-1 font-lexend p-[5px] bg-indigo-900 overflow-x-scroll"
             css={{
               height: "auto",
               minWidth: "100%",
             }}
      >
        <TableHeader>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Created At</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Broker</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Max Owned Tokens</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Minting Fee (CSPR)</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Deploy Status</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Description</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: Broker) => (
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
                    <ItemUpdate broker={item} />
                  </div>
                  <div className="inline-block">
                    <div className="min-w-[200px]">{item.id}</div>
                    <div>{item.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.maxOwnedTokens}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.mintingFee}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {/*<div>{item.deployHash}</div>*/}
                  <div className="flex justify-start">
                    <Text
                      className="bg-amber-500 px-2 py-0.5 rounded-sm text-[13px] m-1 text-black-900_01 w-[100px] items-center justify-center text-center"
                      size="txtLexendRegular8"
                    >
                      {mapDeployStatus(item.deployHash)}
                    </Text>
                  </div>
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
