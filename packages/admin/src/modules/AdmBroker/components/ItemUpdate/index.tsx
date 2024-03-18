import React from 'react';
import { useState } from 'react';
import { useAccount } from '@casperdash/usewallet';
import { Text } from '@mlem-admin/components/Text';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import {
  UseMutateUpdateBrokerParams,
  useMutateUpdateBroker,
} from '@mlem-admin/hooks/mutations/useMutateUpdateBroker';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { Broker } from '@mlem-admin/types/broker';
import { Modal } from 'flowbite-react';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { BsPencil } from 'react-icons/bs';
import { useQueryClient } from 'react-query';

type BrokerItem = {
  broker: Broker;
};

const ESTIMATE_FEE = 5;

const ItemUpdate = ({ broker }: BrokerItem) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const { toastSuccess } = useI18nToast();
  const queryClient = useQueryClient();
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 } } = useGetAccountBalance({
    publicKey,
  });
  const updateNftMutation = useMutateUpdateBroker({
    onSuccess: async () => {
      toastSuccess('update_broker_success');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BROKERS],
      });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (params: UseMutateUpdateBrokerParams) => {
    updateNftMutation.mutate({
      ...params,
      id: broker.id,
      contractHash: broker.contractHash,
    });
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <button className="!text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center w-[26px] p-[5px] rounded bg-indigo-500"
                type="button"
                onClick={openPopup}
        >
          <BsPencil />
        </button>
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        position={modalPlacement}
        size="3xl"
      >
        <FormContainer
          defaultValues={{
            mintingFee: broker.mintingFee,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">
            Update broker
          </Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Minting Fee (CSPR) (*)
                  </Text>
                  <TextFieldElement
                    name="mintingFee"
                    required
                    type="number"
                    value={broker.mintingFee}
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full mt-2">
                <div className="flex flex-col gap-1 items-start justify-start w-full relative">
                  <Text
                    className="text-blue_gray-100 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Estimated Fee
                  </Text>
                  <div className="absolute right-5">
                    <Text
                      className="bg-red-600 px-2 py-0.5 rounded-sm text-[13px] m-1 text-white-A700 w-auto"
                      size="txtLexendSemiBold14Gray300"
                    >
                      {ESTIMATE_FEE} CSPR
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

export default ItemUpdate;
