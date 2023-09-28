import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import ToastMessage from '@mlem/admin/components/Toast';
import { QueryKeys } from '@mlem/admin/enums/queryKeys.enum';
import { useMutateBatchCreateNfts } from '@mlem/admin/hooks/mutations';
import {
  useGetBenefits,
  useGetAllNftCollections,
} from '@mlem/admin/hooks/queries';
import { CreateNftParams } from '@mlem/admin/services/admin/nft/types';
import { Benefit } from '@mlem/admin/types/benefit';
import { NftCollection } from '@mlem/admin/types/nft-collection';
import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';

import { StyledTextFieldElement } from './styled';

const validationSchema = yup.object({
  total: yup
    .number()
    .typeError('Total must be number')
    .required('This field is required')
    .min(1),
  name: yup.string().required('This field is required'),
  tokenAddress: yup.string().required('This field is required'),
  tokenId: yup.string().required('This field is required'),
  imageUrl: yup.string().required('This field is required'),
});

type Props = {
  onSuccess: () => void;
};

const BulkNftForm = ({ onSuccess }: Props) => {
  const queryClient = useQueryClient();
  const [isLoading] = useState(false);
  const [isDisabled] = useState(false);
  const {
    data: { items = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const batchCreateNftsMutation = useMutateBatchCreateNfts({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      ToastMessage({
        type: 'success',
        message: 'Bulk created NFT successfully!',
      });
      onSuccess?.();
    },
  });

  const formContext = useForm<CreateNftParams & { total: string }>({
    defaultValues: {
      total: '1',
      name: '',
      description: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const handleOnSubmitForm = async ({
    total,
    ...createNftParams
  }: CreateNftParams & { total: string }) => {
    const nfts = [...Array.from(Array(Number(total)).keys())].map(
      (value: number) => {
        const currentTokenId = (
          Number(createNftParams.tokenId) + value
        ).toString();
        return {
          ...createNftParams,
          name: createNftParams.name.replaceAll('[id]', currentTokenId),
          imageUrl: createNftParams.imageUrl.replaceAll('[id]', currentTokenId),
          description: createNftParams.description?.replaceAll(
            '[id]',
            currentTokenId
          ),
          tokenId: currentTokenId.toString(),
        };
      }
    );

    batchCreateNftsMutation.mutate({
      nfts,
    });
  };

  const {
    data: { items: nftCollections } = { items: [], total: 0 },
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
      <Box>
        <Typography variant="subtitle2">
          <b>[id]</b> dynamic id number on name, description, image URL.
        </Typography>
      </Box>
      <StyledTextFieldElement
        name="total"
        label="Total"
        required
        type="number"
      />
      <StyledTextFieldElement
        name="name"
        label="Name"
        placeholder={'Melem Card #[id]'}
        required
      />
      <StyledTextFieldElement
        name="description"
        placeholder="Melem Description [id]"
        label="Description"
      />
      <StyledTextFieldElement
        name="imageUrl"
        label="Image Url"
        placeholder="https://example.storage/card_[id].png"
        required
      />
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
      <StyledTextFieldElement
        disabled
        name="tokenId"
        label="Token Id"
        required
      />
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
        <LoadingButton
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isDisabled}
          loading={
            isLoading ||
            isLoadingCollections ||
            isLoadingBenefits ||
            batchCreateNftsMutation.isLoading
          }
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default BulkNftForm;
