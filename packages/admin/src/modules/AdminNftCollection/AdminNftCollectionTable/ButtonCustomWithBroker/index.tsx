import { useState } from 'react';

import { DeployStatusEnum } from '@mlem-admin/enums';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateAssignContractBroker } from '@mlem-admin/hooks/mutations/useMutateAssignContractBroker';
import { useGetBrokers } from '@mlem-admin/hooks/queries/useGetBrokers';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import SelectBrokerField from '@mlem-admin/modules/core/SelectBrokerField';
import { NftCollection } from '@mlem-admin/types/nft-collection';
import { LoadingButton } from '@mui/lab';
import { Chip, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

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
  nftCollection: NftCollection;
};

const ButtonCustomWithBroker = ({ nftCollection }: ButtonUpdateModalProps) => {
  const queryClient = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const [open, setOpen] = useState(false);
  const { data: { items: brokers = [] } = { items: [], total: 0 } } =
    useGetBrokers();
  const assignContractBrokerMutation = useMutateAssignContractBroker({
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
  const handleOnSubmitForm = (updateParams: { brokerId: string }) => {
    const broker = brokers.find(
      (broker) => broker.id === updateParams.brokerId
    );

    assignContractBrokerMutation.mutate({
      ...updateParams,
      nftCollectionId: nftCollection.id,
      brokerContractHash: broker?.contractHash,
      nftContractHash: nftCollection.tokenAddress,
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        {nftCollection.brokerDeployStatus === DeployStatusEnum.PENDING
          ? 'Broker (Pending)'
          : 'Broker'}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Integrate With Broker
          </Typography>
          <Box mt={2}>
            <FormContainer
              defaultValues={{
                brokerId: nftCollection.brokerId,
              }}
              onSuccess={handleOnSubmitForm}
            >
              <Box mt="1rem">
                <SelectBrokerField name="brokerId" />
              </Box>

              <Box mt="2rem">
                <Divider />
              </Box>

              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt="1rem"
              >
                <Box>Integrated Status:</Box>
                <Box mt="10px">
                  {nftCollection.brokerDeployStatus ===
                    DeployStatusEnum.PENDING && (
                    <Chip label="Pending" color="warning" />
                  )}
                  {nftCollection.brokerDeployStatus ===
                    DeployStatusEnum.COMPLETED && (
                    <Chip label="Completed" color="success" />
                  )}
                </Box>
              </Box>

              <Box display={'flex'} justifyContent={'space-between'} mt="1rem">
                <Box>Estimated Fee:</Box>
                <Box>5 CSPR</Box>
              </Box>

              <Box mt="1.5rem">
                <LoadingButton
                  fullWidth
                  type={'submit'}
                  color={'primary'}
                  variant={'contained'}
                  disabled={assignContractBrokerMutation.isLoading}
                  loading={assignContractBrokerMutation.isLoading}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </FormContainer>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCustomWithBroker;
