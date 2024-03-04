'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

import {Text} from '@mlem-admin/components/Text';

import TierUpdate from '@mlem-admin/modules/AdmNftCollection/components/ManageTiers/TierUpdate';

import {useGetTiersByNftCollection} from "@mlem-admin/hooks/queries/useGetTiersByNftCollection";
import {Benefit} from '@mlem-admin/types/benefit';
import {Tier} from '@mlem-admin/types/tier';
import dayjs from 'dayjs';

type Props = {
  nftCollectionId: string;
};

const TierList = ({nftCollectionId}: Props) => {
  const {data: {items = []} = {items: []}, isLoading} =
    useGetTiersByNftCollection({
      nftCollectionId,
    });

  return (
    <>
      <Table removeWrapper isHeaderSticky
             className="!text-gray-400 flex-1 font-lexend w-full p-[5px] bg-indigo-900"
      >
        <TableHeader>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Created At</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Tier</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Slug / Description</TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">Benefits</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: Tier) => (
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
                    <TierUpdate tier={item} />
                  </div>
                  <div className="inline-block">
                    <div className="min-w-[200px]">{item.id}</div>
                    <div>{item.name}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.slug}</div>
                  <div>{item.description}</div>
                </div>
              </TableCell>
              <TableCell>
                {item.benefits && item.benefits.map((nftBenefit, indexBenefit) => {
                  return (
                    <>
                      <div key={nftBenefit.id}  className="min-w-[150px]">
                        <Text
                          className="bg-teal-A700 px-2 py-0.5 rounded-sm text-[13px] m-1 text-black-900_01 w-auto"
                          size="txtLexendRegular8"
                        >
                          {nftBenefit.name}
                        </Text>
                      </div>
                    </>
                  );
                })}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TierList;
