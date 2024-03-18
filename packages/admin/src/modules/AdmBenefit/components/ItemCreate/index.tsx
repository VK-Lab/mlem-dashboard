import React from 'react';
import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Img } from '@mlem-admin/components/Img';
import { Text } from '@mlem-admin/components/Text';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateBenefit } from '@mlem-admin/hooks/mutations';
import { useGetAdminBenefitCategories } from '@mlem-admin/hooks/queries';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { Benefit } from '@mlem-admin/types/benefit';
import { BenefitCategory } from '@mlem-admin/types/benefit-category';
import { Modal } from 'flowbite-react';
import {
  FormContainer,
  TextFieldElement,
  SelectElement,
  useForm,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';

import DiscountsField from './DiscountsField';

export enum BeneiftSourceEnum {
  WOOCOMMERCE = 'woocommerce',
  MANUAL = 'manual',
}

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Total must be number')
    .min(1)
    .max(100)
    .optional(),
  name: yup.string().required('This field is required'),
});

const ItemCreate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const { toastSuccess } = useI18nToast();
  const { data: { items } = { items: [] } } = useGetAdminBenefitCategories();
  const formContext = useForm<Benefit>({
    defaultValues: {
      name: '',
      source: BeneiftSourceEnum.MANUAL,
    },
    resolver: yupResolver(validationSchema),
  });

  const queryClient = useQueryClient();
  const createBenefitMutation = useMutateCreateBenefit({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.BENEFITS] });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (benefit: Benefit) => {
    createBenefitMutation.mutate({
      ...benefit,
      amount: benefit.amount ? Number(benefit.amount) : undefined,
    });
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
            Create Benefit
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
          formContext={formContext}
          defaultValues={{ name: '' }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">
            Create Benefit
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
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Description
                  </Text>
                  <TextFieldElement
                    name="description"
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Benefit Category
                  </Text>
                  <SelectElement
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                    // label="Benefit Category"
                    name="categoryId"
                    sx={{
                      width: '100%',
                    }}
                    options={items.map((benefitCategory: BenefitCategory) => {
                      return {
                        id: benefitCategory.id,
                        label: benefitCategory.name,
                      };
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Source (*)
                  </Text>
                  <SelectElement
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                    // label="Source"
                    name="source"
                    sx={{
                      width: '100%',
                    }}
                    options={[
                      {
                        id: BeneiftSourceEnum.MANUAL,
                        label: 'Manual',
                      },
                      {
                        id: BeneiftSourceEnum.WOOCOMMERCE,
                        label: 'WooCommerce',
                      },
                    ]}
                    required
                  />
                </div>
              </div>
              <DiscountsField />
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
