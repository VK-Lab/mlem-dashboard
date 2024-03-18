import { useState } from 'react';

import { Text } from '@mlem-admin/components/Text';
import { DeployStatusEnum } from '@mlem-admin/enums';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateAssignContractBroker } from '@mlem-admin/hooks/mutations/useMutateAssignContractBroker';
import { useMutateDeleteBrokerOnNftCollection } from '@mlem-admin/hooks/mutations/useMutateDeleteBrokerOnNftCollection';
import { useGetBrokers } from '@mlem-admin/hooks/queries/useGetBrokers';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import FormBroker from '@mlem-admin/modules/AdmNftCollection/components/FormBroker';
import { NftCollection } from '@mlem-admin/types/nft-collection';
import { Modal } from 'flowbite-react';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

interface ItemUpdateBrokerProps {
  item: NftCollection;
}

const ItemUpdateBroker = ({ item }: ItemUpdateBrokerProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useI18nToast();
  const { data: { items: brokers = [] } = { items: [], total: 0 } } =
    useGetBrokers();

  const deleteBrokerMutation = useMutateDeleteBrokerOnNftCollection({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      setOpenModal(false);
    },
    onError: () => {
      toastError('item_update_error');
    },
  });
  const assignContractBrokerMutation = useMutateAssignContractBroker({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      setOpenModal(false);
    },
    onError: () => {
      toastError('item_update_error');
    },
  });

  const handleOnSubmitForm = (updateParams: { brokerId: string }) => {
    const broker = brokers.find(
      (broker) => broker.id === updateParams.brokerId
    );

    if (!broker) {
      if (!item.brokerId) {
        toastError('item_update_error');
        return;
      }

      deleteBrokerMutation.mutate({
        nftCollectionId: item.id,
      });

      return;
    }

    assignContractBrokerMutation.mutate({
      ...updateParams,
      nftCollectionId: item.id,
      brokerContractHash: broker.contractHash,
      nftContractHash: item.tokenAddress,
    });
  };

  return (
    <>
      <div
        className="px-1 py-1 cursor-pointer hover:text-white-A700 hover:bg-gray-500"
        onClick={openPopup}
      >
        Integrate With Broker
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        position={modalPlacement}
        size="3xl"
      >
        <FormContainer
          defaultValues={{
            brokerId: item.brokerId,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">
            Integrate With Broker
          </Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Broker
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <FormBroker name="brokerId" />
                  </div>
                </div>
              </div>
              <div className="relative flex py-1 items-center w-full">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-900">Status</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full relative">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Integrated Status
                  </Text>
                  <div className="absolute right-5">
                    {item.brokerDeployStatus === DeployStatusEnum.PENDING && (
                      <Text
                        className="bg-teal-A700 px-2 py-0.5 rounded-sm text-[13px] m-1 text-black-900_01 w-auto"
                        size="txtLexendSemiBold14Gray300"
                      >
                        Pending
                      </Text>
                    )}
                    {item.brokerDeployStatus === DeployStatusEnum.COMPLETED && (
                      <Text
                        className="bg-cyan-400 px-2 py-0.5 rounded-sm text-[13px] m-1 text-white-A700 w-auto"
                        size="txtLexendSemiBold14Gray300"
                      >
                        Completed
                      </Text>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full relative">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Estimated Fee
                  </Text>
                  <div className="absolute right-5">
                    <Text
                      className="bg-red-600 px-2 py-0.5 rounded-sm text-[13px] m-1 text-white-A700 w-auto"
                      size="txtLexendSemiBold14Gray300"
                    >
                      5 CSPR
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-50 relative">
            <div className="relative w-full h-[20px]">
              <button
                className="absolute left-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[8px] rounded bg-gray-500"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Decline
              </button>
              <button
                className="absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[8px] rounded bg-indigo-500"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ItemUpdateBroker;
