import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import TierForm from './TierForm';

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

type Props = {
  nftCollectionId: string;
};

const ButtonCreateModal = ({ nftCollectionId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOnSuccess = () => {
    handleClose();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create Tier
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Create Tier
          </Typography>
          <Box mt={2}>
            <TierForm
              onSuccess={handleOnSuccess}
              nftCollectionId={nftCollectionId}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
