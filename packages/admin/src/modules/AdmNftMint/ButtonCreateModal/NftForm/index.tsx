import { useMemo } from 'react';

import { useAccount } from '@casperdash/usewallet';
import ToastMessage from '@mlem-admin/components/Toast';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateCreateNft } from '@mlem-admin/hooks/mutations';
import {
  useGetBenefits,
  useGetAllNftCollections,
} from '@mlem-admin/hooks/queries';
import { useGetAccountBalance } from '@mlem-admin/hooks/queries/useGetAccountBalance';
import SelectTiersField from '@mlem-admin/modules/core/SelectTiersField';
import { CreateNftParams } from '@mlem-admin/services/admin/nft/types';
import { Benefit } from '@mlem-admin/types/benefit';
import { NftCollection } from '@mlem-admin/types/nft-collection';
import { LoadingButton } from '@mui/lab';
import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
  useWatch,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';

type NftFormProps = {
  onSuccess: () => void;
};

const ESTIMATE_FEE = 20;

type SelectTiersFieldProps = {
  nftCollections: NftCollection[];
};

const SelectTiersFieldWatch = ({ nftCollections }: SelectTiersFieldProps) => {
  const contractPackageHash = useWatch({
    name: 'contractPackageHash',
  });

  const foundNftCollection = useMemo(() => {
    return nftCollections.find(
      (nftCollection) =>
        nftCollection.contractPackageHash === contractPackageHash
    );
  }, [nftCollections, contractPackageHash]);

  return (
    <SelectTiersField
      name={'tierId'}
      nftCollectionId={foundNftCollection?.id}
    />
  );
};

const NftForm = ({ onSuccess }: NftFormProps) => {
  const queryClient = useQueryClient();
  const { publicKey } = useAccount();
  const { data: { balance = 0 } = { balance: 0 } } = useGetAccountBalance({
    publicKey,
  });

  const {
    data: { items = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const createNftMutation = useMutateCreateNft({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      ToastMessage({
        type: 'success',
        message: 'Created NFT successfully!',
      });
      onSuccess?.();
    },
  });

  const formContext = useForm<CreateNftParams>({
    defaultValues: {
      name: '',
    },
  });

  const handleOnSubmitForm = async (createNftParams: CreateNftParams) => {
    const foundNftCollection = nftCollections.find(
      (nftCollection) =>
        nftCollection.tokenAddress === createNftParams.tokenAddress
    );
    createNftMutation.mutate({
      ...createNftParams,
      contractPackageHash: foundNftCollection?.contractPackageHash,
      collectionName: foundNftCollection?.name,
    });
  };

  const {
    data: { items: nftCollections } = { items: [], total: 0 },
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
      <Box mb="1rem">
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box>Your Balance:</Box>
          <Box>{balance} CSPR</Box>
        </Box>
      </Box>

      <StyledTextFieldElement name="name" label="Name" required />
      <Box mt="1rem">
        <SelectElement
          label="NFT Collection"
          name="tokenAddress"
          sx={{
            width: '100%',
          }}
          options={nftCollections.map((nftCollection: NftCollection) => {
            return {
              id: nftCollection.tokenAddress,
              label: nftCollection.name,
            };
          })}
          required
        />
      </Box>

      <StyledTextFieldElement name="imageUrl" label="Image Url" required />
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
        <SelectTiersFieldWatch nftCollections={nftCollections} />
      </Box>

      <Box mt="1rem">
        <Divider />
        <Box display={'flex'} justifyContent={'space-between'} mt="1rem">
          <Box>Estimated Fee:</Box>
          <Box>{ESTIMATE_FEE} CSPR</Box>
        </Box>
      </Box>

      <Box mt="1.2rem">
        <LoadingButton
          fullWidth
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={balance < ESTIMATE_FEE}
          loading={
            isLoadingCollections ||
            isLoadingBenefits ||
            createNftMutation.isLoading
          }
        >
          Create
        </LoadingButton>
      </Box>

      <Box mt="1.5rem">
        <Typography variant="caption">
          By default, the NFT will have the benefits of the NFT Collection. You
          can add extra benefits by choosing more from this list.
        </Typography>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
