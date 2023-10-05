import { useAccount } from '@casperdash/usewallet';
import ToastMessage from '@mlem-admin/components/Toast';
import { ContractType } from '@mlem-admin/enums/contractType.enum';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateNftCollection } from '@mlem-admin/hooks/mutations';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import SelectBenefitsField from '@mlem-admin/modules/core/SelectBenefitsField';
import { CreateNftCollectionParams } from '@mlem-admin/services/admin/nft-collection/types';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { FormContainer, SelectElement } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

type NftFormProps = {
  onSuccess?: () => void;
};

const ESTIMATE_FEE = 250;

const NftForm = ({ onSuccess }: NftFormProps) => {
  const queryClient = useQueryClient();
  const createNftCollectionMutation = useMutateCreateNftCollection({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created nft collection successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      onSuccess?.();
    },
  });
  const { publicKey } = useAccount();
  const { data: { balanace = 0 } = { balanace: 0 } } = useGetAccountBalance({
    publicKey,
  });

  const handleOnSubmitForm = async (
    createNftCollectionParams: CreateNftCollectionParams
  ) => {
    createNftCollectionMutation.mutate({
      ...createNftCollectionParams,
    });
  };

  return (
    <FormContainer
      defaultValues={{
        name: '',
        contractType: ContractType.CEP78,
      }}
      onSuccess={handleOnSubmitForm}
    >
      <Box mb="1rem">
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>Your Balance:</Box>
          <Box>{balanace} CSPR</Box>
        </Box>
      </Box>

      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="symbol" label="Symbol" required />
      <StyledTextFieldElement
        type="number"
        name="totalTokenSupply"
        label="Total Token Supply"
        required
      />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectElement
          label="Contract Type"
          name="contractType"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: ContractType.CEP78,
              label: 'CEP78',
            },
          ]}
          required
        />
      </Box>
      <Box mt="1rem">
        <SelectBenefitsField name="benefitIds" />
      </Box>

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
          disabled={
            createNftCollectionMutation.isLoading || balanace < ESTIMATE_FEE
          }
          loading={createNftCollectionMutation.isLoading}
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

export default NftForm;
