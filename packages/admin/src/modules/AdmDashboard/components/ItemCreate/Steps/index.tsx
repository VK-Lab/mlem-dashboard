import React from 'react';

import { Text } from '@mlem-admin/components/Text';
import { AdminPaths } from '@mlem-admin/enums/paths.enum';
import { useRouter } from 'next/router';

interface CreateItemStepProps {
  current: number;
}

const CreateItemStep: React.FC<CreateItemStepProps> = ({ current }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-start justify-center w-full px-3 md:py-8 md:px-8">
        <div className="flex flex-row gap-3 items-start justify-start w-full">
          <div className="flex flex-col w-[30px] h-[300px] items-center justify-start md:h-auto">
            <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6">
              <Text
                className="text-center text-deep_purple-200_01 text-sm"
                size="txtBeVietnamProSemiBold14Deeppurple20001"
              >
                1
              </Text>
            </div>
            <div className="bg-deep_purple-900 border-2 border-indigo-900_02 border-solid flex flex-col h-6 items-center justify-start p-0.5 rounded w-6 mt-5">
              <Text
                className="text-center text-deep_purple-200_01 text-sm"
                size="txtBeVietnamProSemiBold14Deeppurple20001"
              >
                2
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-start justify-start">
            <Text
              className={`text-blue_gray-50 w-full cursor-pointer ${
                current == 1 ? 'bg-red-600 py-1 px-1 rounded' : ''
              }`}
              size="txtLexendRegular14Bluegray50"
              onClick={() =>
                router.push(AdminPaths.CREATE_CAMPAIGN_STEP_NFT_COLLECTION)
              }
            >
              Step 1: Configure NFT Collection
            </Text>
            <Text
              className={`text-blue_gray-50 w-full cursor-pointer relative top-1 ${
                current == 2 ? 'bg-red-600 py-1 px-1 rounded top-2' : ''
              }`}
              size="txtLexendRegular14Bluegray50"
              onClick={() => router.push(AdminPaths.CREATE_CAMPAIGN)}
            >
              Step 2: Configure Campaign
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateItemStep;
