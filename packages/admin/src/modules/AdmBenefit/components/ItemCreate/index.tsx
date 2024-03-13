import React from "react";

import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {
  DatePickerElement,
  FormContainer,
  TextFieldElement,
  SelectElement,
  useForm,
  useFormContext,
  useWatch
} from 'react-hook-form-mui';
import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";

import {useI18nToast} from '@mlem-admin/hooks/useToast';
import {yupResolver} from '@hookform/resolvers/yup';
import ToastMessage from '@mlem-admin/components/Toast';
import {QueryKeys} from '@mlem-admin/enums/queryKeys.enum';
import {useMutateCreateBenefit} from '@mlem-admin/hooks/mutations';
import {useGetAdminBenefitCategories} from '@mlem-admin/hooks/queries';
import {Benefit} from '@mlem-admin/types/benefit';
import {BenefitCategory} from '@mlem-admin/types/benefit-category';
import {useQueryClient} from 'react-query';
import * as yup from 'yup';

export enum BeneiftSourceEnum {
  WOOCOMMERCE = 'woocommerce',
  MANUAL = 'manual',
}

type FormProps = {
  onSuccess: (data: Benefit) => void;
  isSubmitting: boolean;
};

const DiscountsField = () => {
  const {control} = useFormContext();
  const source = useWatch({
    control,
    name: 'source',
  });

  if (source !== BeneiftSourceEnum.WOOCOMMERCE) {
    return null;
  }

  return (
    <>
      <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full">
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-gray-950 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Discounts (%) (*)
            </Text>
            <TextFieldElement name="amount" required type="number"
                              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
          </div>
        </div>
      </div>
    </>
  );
};

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Total must be number')
    .min(1)
    .max(100)
    .optional(),
  name: yup.string().required('This field is required'),
});

const ItemCreate = ({onSuccess, isSubmitting}: FormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const {data: {items} = {items: []}} = useGetAdminBenefitCategories();
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
      ToastMessage({
        type: 'success',
        message: 'Created benefit successfully!',
      });
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
            Create Benefit
          </div>
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          formContext={formContext}
          defaultValues={{ name: '' }}
          onSuccess={handleOnSubmitForm}
          isSubmitting={createBenefitMutation.isLoading}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Create Benefit</Modal.Header>
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
                    Benefit Category
                  </Text>
                  <SelectElement className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
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
                  <SelectElement className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
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
              <Button
                className="absolute left-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded bg-gray-500"
                onClick={() => setOpenModal(false)}>Decline</Button>
              <Button
                className={`absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded bg-indigo-500`}
                type="submit"
              >Confirm</Button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ItemCreate;
