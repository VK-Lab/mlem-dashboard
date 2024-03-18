import { useMutateUpdateClaimStatus } from '@mlem-admin/hooks/mutations/useMutateUpdateClaimStatus';
import { useGetClaims } from '@mlem-admin/hooks/queries/useGetClaims';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { Claim, ClaimStatusEnum } from '@mlem-admin/types/claim';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import { PopupState } from 'material-ui-popup-state/core';

import ClaimButtonMenu from './ClaimButtonMenu';

const ItemList = () => {
  const {
    data: { items = [] } = { claims: [], total: 0 },
    refetch,
    isLoading,
  } = useGetClaims();
  const updateClaimStatusMutation = useMutateUpdateClaimStatus();

  const { toastSuccess } = useI18nToast();
  const handleOnChangeStatus = async (
    claimId: string,
    status: ClaimStatusEnum,
    popupState: PopupState
  ) => {
    popupState.close();
    await updateClaimStatusMutation.mutateAsync({
      id: claimId,
      status,
    });
    toastSuccess('item_updated');
    await refetch();
  };

  return (
    <>
      <Table
        removeWrapper
        isHeaderSticky
        className="!text-gray-400 flex-1 font-lexend p-[5px] bg-indigo-900 overflow-x-scroll"
        css={{
          height: 'auto',
          minWidth: '100%',
        }}
      >
        <TableHeader>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Created At
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            ID
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            User Phone Number
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            NFT
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Benefit
          </TableColumn>
          <TableColumn className="!text-gray-400 flex-1 bg-indigo-900 border-b-2">
            Status
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: Claim) => (
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
                    {/*<ItemUpdate broker={item}/>*/}
                    <ClaimButtonMenu
                      popupId={`popup-state-claim-${item.id}`}
                      defaultValue={item.status}
                      onClick={(claimStatus, popupState) =>
                        handleOnChangeStatus(item.id, claimStatus, popupState)
                      }
                    />
                  </div>
                  <div className="inline-block">
                    <div className="min-w-[200px]">{item.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{_get(item, 'nft.name', '-')}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{_get(item, 'benefit.name', '-')}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{item.status}</div>
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
