import React from "react";

import {useState} from 'react';
import {useRouter} from "next/router";

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";
import FormBenefits from "@mlem-admin/modules/AdmNftCollection/components/FormBenefits";
import {AdminPaths} from '@mlem-admin/enums/paths.enum';
import {useAccount} from '@casperdash/usewallet';
import {MintingMode} from '@mlem-admin/contracts/cep78';
import {ContractType} from '@mlem-admin/enums/contractType.enum';
import {QueryKeys} from '@mlem-admin/enums/queryKeys.enum';
import {useMutateCreateNftCollection} from '@mlem-admin/hooks/mutations';
import {useGetAccountBalance} from '@mlem-admin/hooks/queries/useGetAccountBalance';
import {CreateNftCollectionParams} from '@mlem-admin/services/admin/nft-collection/types';
import {useQueryClient} from 'react-query';
import {useI18nToast} from '@mlem-admin/hooks/useToast';
import {Benefit} from "@mlem-admin/types/benefit";

type FormProps = {
  onSuccess?: () => void;
};
const ESTIMATE_FEE = 300;

const StepNftCollectionCreate = ({onSuccess}: FormProps) => {
  const router = useRouter()

  const {toastSuccess, toastError} = useI18nToast();
  const queryClient = useQueryClient();
  const createNftCollectionMutation = useMutateCreateNftCollection({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      onSuccess?.();

      router.push(AdminPaths.CREATE_CAMPAIGN)
    },
  });
  const {publicKey} = useAccount();
  const {data: {balance = 0} = {balance: 0}, isLoading} =
    useGetAccountBalance({
      publicKey,
    });

  const handleOnSubmitForm = async (
    createNftCollectionParams: CreateNftCollectionParams
  ) => {
    createNftCollectionMutation.mutate({
      ...createNftCollectionParams,
    });
  };

  return (
    <>
      <FormContainer
        defaultValues={{
          name: '',
          contractType: ContractType.CEP78,
          mintingMode: MintingMode.Public,
        }}
        onSuccess={handleOnSubmitForm}
        // onSuccess={data => console.log(data)}
      >
        <div className="flex flex-col items-start justify-start w-full">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Name (*)
            </Text>
            <TextFieldElement name="name" required
                              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Symbol (*)
            </Text>
            <TextFieldElement name="symbol" required
                              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Minting Mode (*)
            </Text>
            <SelectElement
              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
              name="mintingMode"
              sx={{
                width: '100%',
              }}
              options={[
                {
                  id: MintingMode.Public,
                  label: 'Public',
                },
              ]}
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Total Token Supply (*)
            </Text>
            <TextFieldElement name="totalTokenSupply" required type="number"
                              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Description
            </Text>
            <TextFieldElement name="description"
                              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Contract Type (*)
            </Text>
            <SelectElement
              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
              name="contractType"
              sx={{
                width: '100%',
              }}
              options={[
                {
                  id: ContractType.CEP78,
                  label: 'CEP78',
                },
              ]}
              required
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full mt-2">
          <div className="flex flex-col gap-1 items-start justify-start w-full">
            <Text
              className="text-blue_gray-100 text-sm w-auto"
              size="txtLexendSemiBold14"
            >
              Benefits
            </Text>
            <div className="  acm-ele-wrapper w-full">
              <FormBenefits
                name="benefitIds"
              />
            </div>
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
              >{ESTIMATE_FEE} CSPR</Text>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end w-full mt-4">
          <Button
            className="cursor-pointer flex items-center justify-center min-w-[192px]"
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
          >
            <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
              Next Step
            </div>
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

export default StepNftCollectionCreate;
