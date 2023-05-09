import { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { useAccount } from '@usedapptesthello/usewallet';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { CEP78ClientInstance } from '@/contracts/cep78';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateNft } from '@/hooks/mutations';
import { useGetBenefits, useGetAllNftCollections } from '@/hooks/queries';
import { CreateNftParams } from '@/services/admin/nft/types';
import { Benefit } from '@/types/benefit';
import { NftCollection } from '@/types/nft-collection';

type NftFormProps = {
  onSuccess: () => void;
};

const NftForm = ({ onSuccess }: NftFormProps) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { publicKey } = useAccount();

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
    createNftMutation.mutate(createNftParams);
  };

  const {
    data: { items: nftCollections } = { items: [], total: 0 },
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  useEffect(() => {
    const subcriber = formContext.watch(async (value, { name }) => {
      if (name === 'tokenAddress') {
        setIsLoading(true);
        setIsDisabled(false);
        if (!value.tokenAddress) {
          return;
        }
        if (!publicKey) {
          return;
        }

        CEP78ClientInstance.setContractHash(
          `hash-${value.tokenAddress}`,
          undefined
        );
        let tokenId = '0';
        try {
          const nextTokenId = await CEP78ClientInstance.numOfMintedTokens();
          tokenId = `${nextTokenId}`;
          // eslint-disable-next-line no-empty
        } catch (err) {}

        formContext.setValue('tokenId', tokenId.toString());
        setIsLoading(false);
      }
    });

    return () => {
      subcriber.unsubscribe();
    };
  }, [formContext, publicKey]);

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
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
      <StyledTextFieldElement
        name="tokenId"
        label="Token Id"
        required
        disabled
      />
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
        <LoadingButton
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          disabled={isDisabled}
          loading={
            isLoading ||
            isLoadingCollections ||
            isLoadingBenefits ||
            createNftMutation.isLoading
          }
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

export default NftForm;
