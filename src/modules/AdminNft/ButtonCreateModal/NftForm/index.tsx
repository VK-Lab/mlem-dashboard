import { useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { ethers, providers } from 'ethers';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import {
  AutocompleteElement,
  FormContainer,
  SelectElement,
  useForm,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import urlJoin from 'url-join';

import { StyledTextFieldElement } from './styled';
import { NFT_COLLECTION_ABI } from '@/abis/nft-collection';
import ToastMessage from '@/components/Toast';
import { Config } from '@/config';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateNft } from '@/hooks/mutations';
import { useGetBenefits, useGetAllNftCollections } from '@/hooks/queries';
import { useI18nToast } from '@/hooks/useToast';
import { CreateNftParams } from '@/services/admin/nft/types';
import { Benefit } from '@/types/benefit';
import { NftCollection } from '@/types/nft-collection';
import { mintNftTo } from '@/utils/ethers';

type NftFormProps = {
  onSuccess: () => void;
};

const NftForm = ({ onSuccess }: NftFormProps) => {
  const { toastError } = useI18nToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    data: { items = [] } = { items: [], total: 0 },
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const createNftMutation = useMutateCreateNft({
    onMutate: async (createNftParams: CreateNftParams) => {
      const walletAddress = _get(window.ethereum, 'selectedAddress', '');
      try {
        await mintNftTo(createNftParams.tokenAddress, {
          walletAddress,
          tokenUri: urlJoin(
            Config.metadataBaseUrl,
            createNftParams.tokenAddress,
            createNftParams.tokenId,
            'metadata'
          ),
        });
      } catch (err) {
        toastError(_get(err, 'code', ''));

        throw err;
      }
    },
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
        if (!window.ethereum) {
          return;
        }
        const provider = new ethers.providers.Web3Provider(
          window.ethereum as providers.ExternalProvider
        );
        const contract = new ethers.Contract(
          value.tokenAddress,
          NFT_COLLECTION_ABI,
          provider
        );

        const tokenId = await contract.nextTokenIdToMint();
        const owner = await contract.owner();

        const selectedAddress = _get(window.ethereum, 'selectedAddress', '');

        if (
          !_isString(owner) ||
          owner.toLowerCase() !== selectedAddress.toLowerCase()
        ) {
          setIsDisabled(true);
        }

        formContext.setValue('tokenId', tokenId.toString());
        setIsLoading(false);
      }
    });

    return () => {
      subcriber.unsubscribe();
    };
  }, [formContext]);

  return (
    <FormContainer formContext={formContext} onSuccess={handleOnSubmitForm}>
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
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
