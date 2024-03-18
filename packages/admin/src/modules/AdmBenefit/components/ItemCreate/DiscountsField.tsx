import React from 'react';

import { Text } from '@mlem-admin/components/Text';
import { BeneiftSourceEnum } from '@mlem-admin/modules/AdmBenefit/components/ItemCreate/index';
import {
  TextFieldElement,
  useFormContext,
  useWatch,
} from 'react-hook-form-mui';

const DiscountsField = () => {
  const { control } = useFormContext();
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
            <TextFieldElement
              name="amount"
              required
              type="number"
              className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscountsField;
