import { useState } from 'react';

import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateUpdateNftCollection } from '@mlem-admin/hooks/mutations';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { UpdateNftCollectionParams } from '@mlem-admin/services/admin/nft-collection/types';
import { Broker } from '@mlem-admin/types/broker';
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
  broker: Broker;
};

const ButtonUpdateModal = ({ broker }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const [open, setOpen] = useState(false);
  const updateNftMutation = useMutateUpdateNftCollection({
    onSuccess: async () => {
      toastSuccess('update_nft_collection_success');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (
    updateNftCollectionParams: UpdateNftCollectionParams
  ) => {
    updateNftMutation.mutate({
      ...updateNftCollectionParams,
      id: broker.id,
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
            Update Nft
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                name: broker.name,
                description: broker.description,
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement name="name" label="Name" required />
              <StyledTextFieldElement name="description" label="Description" />

              <Box mt="1rem">
                <LoadingButton
                  fullWidth
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                  disabled={updateNftMutation.isLoading}
                  loading={updateNftMutation.isLoading}
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