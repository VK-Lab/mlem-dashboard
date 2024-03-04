import React from "react";

import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";

import {useI18nToast} from '@mlem-admin/hooks/useToast';
import { useAccount } from '@casperdash/usewallet';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateBroker } from '@mlem-admin/hooks/mutations/useMutateCreateBroker';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { CreateBrokerParams } from '@mlem-admin/services/admin/broker/types';
import { useQueryClient } from 'react-query';

type FormProps = {
  onSuccess?: () => void;
};
const ESTIMATE_FEE = 110;

const ItemCreate = ({onSuccess}: FormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const {toastSuccess, toastError} = useI18nToast();
  const queryClient = useQueryClient();
  const createBrokerMutation = useMutateCreateBroker({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BROKERS],
      });
      onSuccess?.();
    },
  });
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 }, isLoading } =
    useGetAccountBalance({
      publicKey,
    });

  const handleOnSubmitForm = async (createBrokerParams: CreateBrokerParams) => {
    createBrokerMutation.mutate({
      ...createBrokerParams,
    });
  };

  return (
    <>
      <div className="flex justify-start items-center w-full">
        <Button
          className="cursor-pointer flex items-center justify-center w-full"
          leftIcon={
            <Img
              className="h-6 mr-2"
              src="/v2/images/img_lock.svg"
              alt="lock"
            />
          }
          shape="round"
          color="amber_500"
          size="sm"
          variant="fill"
          type="button"
          onClick={openPopup}
        >
          <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
            Create Broker
          </div>
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            name: '',
            description: '',
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Create Broker</Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-2 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Name (*)
                  </Text>
                  <TextFieldElement name="name" required
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Description
                  </Text>
                  <TextFieldElement name="description"
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Max Owned Token (*)
                  </Text>
                  <TextFieldElement name="maxOwnedTokens" required type="number"
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Minting Fee (CSPR) (*)
                  </Text>
                  <TextFieldElement name="mintingFee" required type="number"
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
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
                    >{ESTIMATE_FEE} CSPR</Text>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-50 relative">
            <div className="relative w-full h-[20px]">
              <Button
                className="absolute left-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded bg-gray-500"
                onClick={() => setOpenModal(false)}>Decline</Button>
              <Button
                className={`absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded  ${
                  createBrokerMutation.isLoading || balance < ESTIMATE_FEE ? 'bg-gray-500' : 'bg-indigo-500'
                }`}
                type="submit"
                disabled={
                  createBrokerMutation.isLoading || balance < ESTIMATE_FEE
                }
              >Confirm</Button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ItemCreate;
