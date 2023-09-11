import { useState } from 'react';

import { useAccount } from '@casperdash/usewallet';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useQueryClient } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateRegisterTokenOwner } from '@/hooks/mutations';
import { useGetAccountBalance } from '@/hooks/queries/useGetAccountBalance';
import { useI18nToast } from '@/hooks/useToast';
import { NftCollection } from '@/types/nft-collection';

type Props = {
  nftCollection: NftCollection;
};

const ESTIMATE_FEE = 10;

const ButtonRegisterTokenOwner = ({ nftCollection }: Props) => {
  const [open, setOpen] = useState(false);
  const { publicKey } = useAccount();
  const { data: { balanace = 0 } = { balanace: 0 } } = useGetAccountBalance({
    publicKey,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const client = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const { mutate, isLoading } = useMutateRegisterTokenOwner({
    onSuccess: async () => {
      toastSuccess('success');
      await client.invalidateQueries([QueryKeys.NFT_COLLECTIONS]);
    },
  });

  const handleOnConfirm = () => {
    mutate({
      id: nftCollection.id,
      name: nftCollection.name,
    });
  };

  const handleOnOpenModal = () => {
    handleOpen();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOnOpenModal}>
        Register
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Register Token Owner</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To ensure a smooth minting process for non-fungible tokens (NFTs),
            it is essential to register the token owner on an NFT Collection.
          </DialogContentText>
          <Box mt="2rem">
            <Divider />
          </Box>
          <Box mt="2rem">
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box>Your Balance:</Box>
              <Box>{balanace} CSPR</Box>
            </Box>
          </Box>
          <Box mt="1rem">
            <Box display={'flex'} justifyContent={'space-between'} mt="1rem">
              <Box>Estimated Fee:</Box>
              <Box>{ESTIMATE_FEE} CSPR</Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleOnConfirm}
            autoFocus
            loading={isLoading}
            disabled={balanace < ESTIMATE_FEE}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ButtonRegisterTokenOwner;
