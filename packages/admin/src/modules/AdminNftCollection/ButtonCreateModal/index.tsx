import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import NftForm from './NftForm';

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

const ButtonCreateModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnSuccess = () => {
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create NFT Collection
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Create NFT Collection
          </Typography>
          <Box mt={2}>
            <NftForm onSuccess={handleOnSuccess} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
