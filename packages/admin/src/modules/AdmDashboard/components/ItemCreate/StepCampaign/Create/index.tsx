import React from "react";

import {useI18nToast} from '@mlem-admin/hooks/useToast';
import {QueryKeys} from '@mlem-admin/enums/queryKeys.enum';
import {useMutateCreateCampaign} from '@mlem-admin/hooks/mutations';
import FormNftCollections from '@mlem-admin/modules/AdmDashboard/components/FormNftCollections';
import {CreateCampaignParams} from '@mlem-admin/services/admin/campaign/types';
import {DatePickerElement, FormContainer, SelectElement, TextFieldElement} from 'react-hook-form-mui';
import {useQueryClient} from 'react-query';
import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";
import {AdminPaths} from "@mlem-admin/enums/paths.enum";
import {useRouter} from "next/router";

type FormProps = {
  onSuccess?: () => void;
};

const StepCampaignCreate = ({onSuccess}: FormProps) => {
  const router = useRouter()

  const queryClient = useQueryClient();
  const {toastSuccess, toastError} = useI18nToast();
  const createCampaignMutation = useMutateCreateCampaign({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.CAMPAIGNS],
      });
      onSuccess?.();

      router.push(AdminPaths.LIST_CAMPAIGNS)
    },
  });

  const handleOnSubmitForm = (createCampaignParams: CreateCampaignParams) => {
    createCampaignMutation.mutate(createCampaignParams);
  };

  return (
    <>
      <div className="flex md:flex-1 flex-col gap-6 items-start justify-start w-full">
        <FormContainer
          defaultValues={{
            name: '',
            description: '',
            startDate: undefined,
            endDate: undefined,
            imageUrl: undefined,
            nftCollectionIds: undefined,
            thumbnailUrl: undefined,
            type: 'free_mint',
            shortDescription: undefined,
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
                                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                Short Description
              </Text>
              <TextFieldElement name="description"
                                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                Type (*)
              </Text>
              <SelectElement
                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"
                name="type"
                sx={{
                  width: '100%',
                }}
                options={[
                  {
                    id: 'free_mint',
                    label: 'Free Mint',
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
                Thumbnail URL
              </Text>
              <TextFieldElement name="thumbnailUrl"
                                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                Image URL (*)
              </Text>
              <TextFieldElement name="imageUrl" required
                                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"/>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                Start Date (*)
              </Text>
              <DatePickerElement
                name="startDate" required
                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"

              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                End Date (*)
              </Text>
              <DatePickerElement
                name="endDate" required
                className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px] acm-ele-wrapper"

              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full mt-2">
            <div className="flex flex-col gap-1 items-start justify-start w-full">
              <Text
                className="text-blue_gray-100 text-sm w-auto"
                size="txtLexendSemiBold14"
              >
                NFT Collections (*)
              </Text>
              <div className="min-w-[660px] acm-ele-wrapper w-full">
                <FormNftCollections
                  name="nftCollectionIds"
                />
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
                Create Campaign
              </div>
            </Button>
          </div>
        </FormContainer>
      </div>
    </>
  );
};

export default StepCampaignCreate;
