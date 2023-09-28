import { useState } from 'react';

import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { useMutateUpdateTier } from '@mlem/admin/hooks/mutations/useMutateUpdateTier';
import { useI18nToast } from '@mlem/admin/hooks/useToast';
import SelectBenefitsField from '@mlem/admin/modules/core/SelectBenefitsField';
import { UpdateTierParams } from '@mlem/admin/services/admin/tier/types';
import { Tier } from '@mlem/admin/types/tier';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormContainer } from 'react-hook-form-mui';
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
  tier: Tier;
};

const ButtonUpdateModal = ({ tier }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const [open, setOpen] = useState(false);
  const updateTierMutation = useMutateUpdateTier({
    onSuccess: async () => {
      toastSuccess('Updated tier successfully!');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (updateTierParams: UpdateTierParams) => {
    updateTierMutation.mutate({
      ...updateTierParams,
      id: tier.id,
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
            Update Tier
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                name: tier.name,
                description: tier.description,
                benefitIds: tier.benefitIds,
                slug: tier.slug,
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement name="name" label="Name" required />
              <StyledTextFieldElement name="slug" label="slug" />
              <StyledTextFieldElement name="description" label="Description" />
              <Box mt="1rem">
                <SelectBenefitsField name="benefitIds" />
              </Box>
              <Box mt="1rem">
                <LoadingButton
                  fullWidth
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                  disabled={updateTierMutation.isLoading}
                  loading={updateTierMutation.isLoading}
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
