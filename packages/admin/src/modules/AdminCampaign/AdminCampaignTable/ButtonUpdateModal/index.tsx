import { useState } from 'react';

import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateUpdateCampaign } from '@mlem-admin/hooks/mutations';
import SelectNftCollectionsField from '@mlem-admin/modules/core/SelectNftCollectionsField';
import { UpdateCampaignParams } from '@mlem-admin/services/admin/campaign/types';
import { Campaign } from '@mlem-admin/types/campaign';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { DatePickerElement, FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type ButtonUpdateModalProps = {
  campaign: Campaign;
};

const ButtonUpdateModal = ({ campaign }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const updateCampaignMutation = useMutateUpdateCampaign({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Updated campaign successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.CAMPAIGNS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (updateCampaignParams: UpdateCampaignParams) => {
    updateCampaignMutation.mutate({
      ...updateCampaignParams,
      id: campaign.id,
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Campaign
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                name: campaign.name,
                description: campaign.description,
                nftCollectionIds: campaign.nftCollectionIds,
                startDate: campaign.startDate
                  ? dayjs(campaign.startDate)
                  : undefined,
                endDate: campaign.endDate ? dayjs(campaign.endDate) : undefined,
                imageUrl: campaign.imageUrl,
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
                <SelectNftCollectionsField
                  name="nftCollectionIds"
                  campaignId={campaign.id}
                />
              </Box>
              <Box mt="1rem">
                <LoadingButton
                  loading={updateCampaignMutation.isLoading}
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                >
                  Update
                </LoadingButton>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonUpdateModal;
