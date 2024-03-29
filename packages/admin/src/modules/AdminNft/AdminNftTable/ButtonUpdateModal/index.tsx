import { useState } from 'react';

import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateUpdateNft } from '@mlem-admin/hooks/mutations';
import { useGetBenefits } from '@mlem-admin/hooks/queries';
import SelectTiersField from '@mlem-admin/modules/core/SelectTiersField';
import { UpdateNftParams } from '@mlem-admin/services/admin/nft/types';
import { Benefit } from '@mlem-admin/types/benefit';
import { Nft } from '@mlem-admin/types/nft';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { AutocompleteElement, FormContainer } from 'react-hook-form-mui';
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
  nft: Nft;
};

const ButtonUpdateModal = ({ nft }: ButtonUpdateModalProps) => {
  const { data: { items = [] } = { items: [], total: 0 } } = useGetBenefits();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const updateNftMutation = useMutateUpdateNft({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Updated nft successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (updateNftParams: UpdateNftParams) => {
    updateNftMutation.mutate({
      ...updateNftParams,
      id: nft.id,
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
                name: nft.name,
                description: nft.description,
                benefits: nft.benefits
                  ? nft.benefits.map((benefit: Benefit) =>
                      benefit.id.toString()
                    )
                  : [],
                tierId: nft.tierId,
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement name="name" label="Name" required />
              <StyledTextFieldElement name="description" label="Description" />
              <Box mt="1rem">
                <AutocompleteElement
                  label="Benefits"
                  matchId
                  multiple
                  name="benefits"
                  options={items.map((item: Benefit) => {
                    return {
                      id: item.id,
                      label: item.name,
                    };
                  })}
                />
              </Box>
              <Box mt="1rem">
                <SelectTiersField
                  name={'tierId'}
                  nftCollectionId={nft?.nftCollection?.id}
                />
              </Box>
              <Box mt="1rem">
                <Button type={'submit'} color={'primary'} variant={'contained'}>
                  Update
                </Button>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonUpdateModal;
