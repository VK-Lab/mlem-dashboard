import React from "react";

import {Button} from '@mlem-admin/components/Button';
import {Img} from '@mlem-admin/components/Img';
import {Input} from '@mlem-admin/components/Input';
import {Text} from '@mlem-admin/components/Text';

import {DatePickerElement, FormContainer, SelectElement} from 'react-hook-form-mui';

import ListLeftInfo from '@mlem-admin/components/ListLeftInfo';
import CreateItemStep from "@mlem-admin/components/CreateItemStep";

const CreateCampaign = (props) => {

  const handleOnSubmitForm = () => {
    console.log('submittttttt');
  };

  return (
    <>
      <div className={props.className}>
        <div className="flex md:flex-col flex-row gap-3 items-start justify-center w-full">
          <ListLeftInfo/>

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
              // onSuccess={handleOnSubmitForm}
              onSuccess={data => console.log(data)}
            >
            <div className="flex flex-col items-start justify-start w-full">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Name (*)
                </Text>
                <Input
                  name="name" required
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full min-w-[660px]"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Short Description
                </Text>
                <Input
                  name="description"
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Type (*)
                </Text>
                <Input
                  name="type" required value="Free Mint" disabled
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Thumbnail URL
                </Text>
                <Input
                  name="thumbnailUrl"
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Image URL (*)
                </Text>
                <Input
                  name="imageUrl"
                  placeholder="input..."
                  className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full"
                  wrapClassName="border border-indigo-50_0c border-solid w-full"
                  shape="round"
                  color="indigo_900_cc"
                  size="xs"
                  variant="fill"
                ></Input>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  Start Date
                </Text>
                <DatePickerElement
                  name="startDate" required
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"

                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full mt-2">
              <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <Text
                  className="text-blue_gray-100 text-sm w-auto"
                  size="txtLexendSemiBold14"
                >
                  End Date
                </Text>
                <DatePickerElement
                  name="endDate" required
                  className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"

                />
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
          </div>

          <CreateItemStep/>
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;
