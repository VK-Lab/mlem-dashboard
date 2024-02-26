import React from "react";

import {Button} from '@mlem-admin/components/Button';
import {Img} from '@mlem-admin/components/Img';
import {Text} from '@mlem-admin/components/Text';
import {AdminPaths} from '@mlem-admin/enums/paths.enum';
import { useRouter } from 'next/router';

const CreateItemStep: React.FC<CreateItemStepProps> = (props) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-1 flex-col items-start justify-start w-full">
        <div className="flex flex-col items-start justify-center w-auto">
          <div className="flex flex-row gap-4 items-start justify-start w-auto">
            <div className="flex flex-col w-[60px] h-[300px] md:h-auto items-start justify-start">
              <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
                <Text
                  className="text-center text-deep_purple-200_01 text-sm"
                  size="txtBeVietnamProSemiBold14Deeppurple20001"
                >
                  1
                </Text>
              </div>
              <Img
                className="h-[85px] w-full"
                src="/v2/images/img_frame1321315162.svg"
                alt="step 1"
              />
              <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
                <Text
                  className="text-center text-deep_purple-200_01 text-sm"
                  size="txtBeVietnamProSemiBold14Deeppurple20001"
                >
                  2
                </Text>
              </div>
              <Img
                className="h-[85px] w-full"
                src="/v2/images/img_frame1321315162.svg"
                alt="step 2"
              />
              <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
                <Text
                  className="text-center text-deep_purple-200_01 text-sm"
                  size="txtBeVietnamProSemiBold14Deeppurple20001"
                >
                  3
                </Text>
              </div>
              <Img
                className="h-[15px] w-full"
                src="/v2/images/img_frame1321315162.svg"
                alt="step 3"
              />
            </div>
            <div className="flex flex-col gap-6 items-start justify-start w-[316px]">
              <Text
                className="text-blue_gray-50 text-sm w-full cursor-pointer"
                size="txtLexendRegular14Bluegray50"
                onClick={() => router.push(AdminPaths.CREATE_CAMPAIGN_STEP_BENEFIT)}
              >
                Step 1: Configure Benefit
              </Text>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-col h-11 md:h-auto items-center justify-start w-full">
                  <div className="bg-gray-900 flex flex-row h-11 md:h-auto items-start justify-start rounded w-w-full">
                    <Button
                      className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-full"
                      shape="round"
                      color="gray_900"
                      size="sm"
                      variant="fill"
                      onClick={() => alert('popup create benefit category')}
                    >
                      Create Benefit Category
                    </Button>
                  </div>
                </div>
              </div>
              <Text
                className="text-blue_gray-50 text-sm w-full cursor-pointer"
                size="txtLexendRegular14Bluegray50"
                onClick={() => router.push(AdminPaths.CREATE_CAMPAIGN_STEP_NFT_COLLECTION)}
              >
                Step 2: Configure NFT Collection
              </Text>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-col h-11 md:h-auto items-center justify-start w-full">
                  <div className="bg-gray-900 flex flex-row h-11 md:h-auto items-start justify-start rounded w-full">
                    <Button
                      className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-1/2"
                      shape="round"
                      color="indigo_500_7f"
                      size="sm"
                      variant="fill"
                      onClick={() => alert('popup add tier')}
                    >
                      Add Tier
                    </Button>
                    <Button
                      className="!text-white-A700 cursor-pointer font-lexend h-11 text-center text-sm w-1/2"
                      shape="round"
                      color="gray_900"
                      size="sm"
                      variant="fill"
                      onClick={() => alert('popup add broker')}
                    >
                      Add Broker
                    </Button>
                  </div>
                </div>
              </div>
              <Text
                className="text-blue_gray-50 text-sm w-full cursor-pointer"
                size="txtLexendRegular14Bluegray50"
                onClick={() => router.push(AdminPaths.CREATE_CAMPAIGN)}
              >
                Step 3: Configure Campaign
              </Text>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateItemStep;
