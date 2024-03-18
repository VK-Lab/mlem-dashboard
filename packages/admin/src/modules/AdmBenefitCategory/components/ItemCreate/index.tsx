import React from 'react';
import { useState } from 'react';

import { Img } from '@mlem-admin/components/Img';
import { Text } from '@mlem-admin/components/Text';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateBenefitCategory } from '@mlem-admin/hooks/mutations';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { BenefitCategory } from '@mlem-admin/types/benefit-category';
import { Modal } from 'flowbite-react';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

type FormProps = {
  onSuccess?: () => void;
};

const ItemCreate = ({ onSuccess }: FormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const { toastSuccess } = useI18nToast();
  const queryClient = useQueryClient();
  const createBenefitMutation = useMutateCreateBenefitCategory({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BENEFIT_CATEGORIES],
      });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (benefitCategory: BenefitCategory) => {
    createBenefitMutation.mutate(benefitCategory);
  };

  return (
    <>
      <div className="flex justify-start items-center w-full">
        <button
          className="cursor-pointer flex items-center justify-center w-full rounded p-[13px] bg-amber-500"
          type="button"
          onClick={openPopup}
        >
          <Img
            className="h-6 mr-2"
            src="/v2/images/img_lock.svg"
            alt="popup_create"
          />
          <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
            Create Benefit Category
          </div>
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
            name: '',
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">
            Create Benefit Category
          </Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Name (*)
                  </Text>
                  <TextFieldElement
                    name="name"
                    required
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                  />
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

export default ItemCreate;
