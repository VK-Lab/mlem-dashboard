import { useAccount } from '@casperdash/usewallet';
import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateBroker } from '@mlem-admin/hooks/mutations/useMutateCreateBroker';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import { CreateBrokerParams } from '@mlem-admin/services/admin/broker/types';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

type BrokerFormProps = {
  onSuccess?: () => void;
};

const ESTIMATE_FEE = 200;

const BrokerForm = ({ onSuccess }: BrokerFormProps) => {
  const queryClient = useQueryClient();
  const createBrokerMutation = useMutateCreateBroker({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created broker successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BROKERS],
      });
      onSuccess?.();
    },
  });
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 }, isLoading } =
    useGetAccountBalance({
      publicKey,
    });

  const handleOnSubmitForm = async (createBrokerParams: CreateBrokerParams) => {
    createBrokerMutation.mutate({
      ...createBrokerParams,
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        description: '',
      }}
      onSuccess={handleOnSubmitForm}
    >
      <Box mb="1rem">
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>Your Balance:</Box>
          <Box>{isLoading ? '...' : balance} CSPR</Box>
        </Box>
      </Box>

      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <StyledTextFieldElement
        type="number"
        name="maxOwnedTokens"
        label="maxOwnedTokens"
        required
      />
      <StyledTextFieldElement
        type="number"
        name="mintingFee"
        label="mintingFee"
        required
      />

      <Box mt="1rem">
        <Divider />
        <Box display={'flex'} justifyContent={'space-between'} mt="1rem">
          <Box>Estimated Fee:</Box>
          <Box>{ESTIMATE_FEE} CSPR</Box>
        </Box>
      </Box>

      <Box mt="1.5rem">
        <LoadingButton
          fullWidth
          disabled={createBrokerMutation.isLoading || balance < ESTIMATE_FEE}
          loading={createBrokerMutation.isLoading}
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default BrokerForm;
