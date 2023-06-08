import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateSendNft } from '@/hooks/mutations/useMutateSendNft';
import { Nft } from '@/types/nft';

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

type ButtonSendModalProps = {
  nft: Nft;
};

const ButtonSendModal = ({ nft }: ButtonSendModalProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const sendNftMutation = useMutateSendNft({
    onSuccess: async (hash: string | null) => {
      console.log('hash', hash);
      ToastMessage({
        type: 'success',
        message: 'Send nft successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (params: { toPublicKeyHex: string }) => {
    sendNftMutation.mutate({
      ...params,
      tokenAddress: nft.tokenAddress,
      tokenId: nft.tokenId,
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Send
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Send NFT
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                toPublicKeyHex: '',
              }}
              onSuccess={handleOnSubmitForm}
            >
              <StyledTextFieldElement
                name="toPublicKeyHex"
                label="toPublicKeyHex"
                required
              />

              <Box mt="1rem">
                <Button type={'submit'} color={'primary'} variant={'contained'}>
                  Send
                </Button>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonSendModal;
