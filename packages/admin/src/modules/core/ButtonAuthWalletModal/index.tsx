import { useState } from 'react';

import { useCheckPhoneVerfied } from '@mlem/admin/hooks/queries';
import { Box, Modal } from '@mui/material';

import AuthWallet from './AuthWallet';
import { StyledBox } from './styled';

export const ButtonAuthWalletModal = () => {
  const { data: { isPhoneVerfied } = { isPhoneVerfied: false }, refetch } =
    useCheckPhoneVerfied();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  if (isPhoneVerfied) {
    return null;
  }

  const handleOnSuccess = async () => {
    await refetch();
    handleClose();
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <AuthWallet onSuccess={() => handleOnSuccess()} />
        </StyledBox>
      </Modal>
    </Box>
  );
};
