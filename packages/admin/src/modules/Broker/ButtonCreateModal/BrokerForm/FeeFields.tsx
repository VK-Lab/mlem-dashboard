import { useFormContext } from 'react-hook-form';

import { StyledTextFieldElement } from './styled';

const FeeFields = () => {
  const form = useFormContext();

  const { watch } = form;
  const isAllowMintingFee = watch('isAllowMintingFee');
  if (!isAllowMintingFee) {
    return null;
  }

  return (
    <StyledTextFieldElement name="mintingFee" label="Minting Fee" required />
  );
};

export default FeeFields;
