import React from 'react';

import dynamic from 'next/dynamic';
import { Controller, useFormContext } from 'react-hook-form';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
});

export const MarkdownField = () => {
  const { control } = useFormContext();
  return (
    <div>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MDEditor
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            ref={ref}
            data-color-mode="light"
          />
        )}
      />
    </div>
  );
};

export default MarkdownField;
