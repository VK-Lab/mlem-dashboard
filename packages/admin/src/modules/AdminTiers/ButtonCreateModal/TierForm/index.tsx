import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateTier } from '@mlem-admin/hooks/mutations/useMutateCreateTier';
import { CreateTierParams } from '@mlem-admin/services/admin/tier/types';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

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
        slug: '',
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="slug" label="Slug" />
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
