import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateCampaign } from '@mlem-admin/hooks/mutations';
import SelectNftCollectionsField from '@mlem-admin/modules/core/SelectNftCollectionsField';
import { CreateCampaignParams } from '@mlem-admin/services/admin/campaign/types';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { DatePickerElement, FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

type Props = {
  onSuccess?: () => void;
};

const NftForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();

  const createCampaignMutation = useMutateCreateCampaign({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created campaign successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.CAMPAIGNS],
      });
      onSuccess?.();
    },
  });

  const handleOnSubmitForm = (createCampaignParams: CreateCampaignParams) => {
    createCampaignMutation.mutate(createCampaignParams);
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
        startDate: undefined,
        endDate: undefined,
        imageUrl: undefined,
        nftCollectionIds: undefined,
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <StyledTextFieldElement name="imageUrl" label="Image URL" />
      <Box mt="18px">
        <DatePickerElement name="startDate" label="Start Date" />
      </Box>
      <Box mt="18px">
        <DatePickerElement name="endDate" label="End Date" />
      </Box>

      <Box mt="1rem">
        <SelectNftCollectionsField name="nftCollectionIds" />
      </Box>
      <Box mt="1rem">
        <LoadingButton
          loading={createCampaignMutation.isLoading}
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

export default NftForm;
