import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateCampaign } from '@mlem-admin/hooks/mutations';
import SelectNftCollectionsField from '@mlem-admin/modules/core/SelectNftCollectionsField';
import { CreateCampaignParams } from '@mlem-admin/services/admin/campaign/types';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import {
  DatePickerElement,
  FormContainer,
  SelectElement,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import MarkdownField from '../../AdminCampaignTable/ButtonUpdateModal/MarkdownField';

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
        thumbnailUrl: undefined,
        type: 'free_mint',
        shortDescription: undefined,
      }}
      onSuccess={handleOnSubmitForm}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement
        name="shortDescription"
        label="Short Description"
      />

      <Box mt="1rem">
        <Box mb="0.5rem">Description</Box>
        <MarkdownField />
      </Box>
      <Box display={'flex'} gap={'10px'}>
        <StyledTextFieldElement name="thumbnailUrl" label="Thumbnail URL" />
        <StyledTextFieldElement name="imageUrl" label="Image URL" required />
      </Box>

      <Box mt="1rem" display={'flex'} gap="10px">
        <Box>
          <SelectElement
            label="Type"
            name="type"
            style={{ width: '100%' }}
            options={[
              {
                id: 'free_mint',
                label: 'Free Mint',
              },
            ]}
            required
          />
        </Box>
        <Box width={'100%'}>
          <SelectNftCollectionsField name="nftCollectionIds" />
        </Box>
      </Box>

      <Box mt="18px" display={'flex'} gap={'10px'}>
        <Box>
          <DatePickerElement name="startDate" label="Start Date" required />
        </Box>
        <Box>
          <DatePickerElement name="endDate" label="End Date" required />
        </Box>
      </Box>

      {/* <Box mt="1rem">
        <CheckboxElement name="isOpenWhitelist" label="Is Open Whitelist" />
      </Box> */}

      <Box mt="1rem">
        <LoadingButton
          loading={createCampaignMutation.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          style={{ width: '100%' }}
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
