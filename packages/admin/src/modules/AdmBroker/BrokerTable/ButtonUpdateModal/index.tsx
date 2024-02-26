import { useState } from 'react';

import { useAccount } from '@casperdash/usewallet';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import {
  UseMutateUpdateBrokerParams,
  useMutateUpdateBroker,
} from '@mlem-admin/hooks/mutations/useMutateUpdateBroker';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import { Broker } from '@mlem-admin/types/broker';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
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

const ESTIMATED_FEE = 5;

const ButtonUpdateModal = ({ broker }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 } } = useGetAccountBalance({
    publicKey,
  });
  const { toastSuccess } = useI18nToast();
  const [open, setOpen] = useState(false);
  const updateNftMutation = useMutateUpdateBroker({
    onSuccess: async () => {
      toastSuccess('update_broker_success');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BROKERS],
      });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (params: UseMutateUpdateBrokerParams) => {
    updateNftMutation.mutate({
      ...params,
      id: broker.id,
      contractHash: broker.contractHash,
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
            Update Broker
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                // name: broker.name,
                // description: broker.description,
                // maxOwnedTokens: broker.maxOwnedTokens,
                mintingFee: broker.mintingFee,
              }}
              onSuccess={handleOnSubmitForm}
            >
              {/* <StyledTextFieldElement name="description" label="Description" /> */}
              {/* <StyledTextFieldElement
                type="number"
                name="maxOwnedTokens"
                label="Max Owned Tokens"
                required
              /> */}
              <StyledTextFieldElement
                type="number"
                name="mintingFee"
                label="Minting Fee (CSPR)"
                required
              />

              <Box mt="1rem">
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  mt="1rem"
                >
                  <Box>Estimated Fee:</Box>
                  <Box>{ESTIMATED_FEE} CSPR</Box>
                </Box>
              </Box>

              <Box mt="1rem">
                <LoadingButton
                  fullWidth
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                  disabled={
                    updateNftMutation.isLoading || balance < ESTIMATED_FEE
                  }
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
