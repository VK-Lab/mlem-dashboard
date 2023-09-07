import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateTier } from '@/hooks/mutations/useMutateCreateTier';
import { CreateTierParams } from '@/services/admin/tier/types';

type NftFormProps = {
  onSuccess?: () => void;
  nftCollectionId: string;
};

const TierForm = ({ onSuccess, nftCollectionId }: NftFormProps) => {
  const queryClient = useQueryClient();
  const createTier = useMutateCreateTier({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created tier successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS, nftCollectionId, QueryKeys.TIERS],
      });
      onSuccess?.();
    },
  });

  const handleOnSubmitForm = async (createTierParams: CreateTierParams) => {
    if (!nftCollectionId) {
      ToastMessage({
        type: 'error',
        message: 'Please select a collection!',
      });

      return;
    }

    createTier.mutate({
      ...createTierParams,
      nftCollectionId,
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />

      <Box mt="1.5rem">
        <LoadingButton
          fullWidth
          disabled={createTier.isLoading}
          loading={createTier.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default TierForm;
