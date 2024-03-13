import React from "react";

import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";
import FormTiers from "@mlem-admin/modules/AdmNftMint/components/FormTiers";

import {useI18nToast} from '@mlem-admin/hooks/useToast';
import {useMemo} from 'react';
import {useAccount} from '@casperdash/usewallet';
import {QueryKeys} from '@mlem-admin/enums/queryKeys.enum';
import {useMutateCreateNft} from '@mlem-admin/hooks/mutations';
import {useGetBenefits, useGetAllNftCollections} from '@mlem-admin/hooks/queries';
import {useGetAccountBalance} from '@mlem-admin/hooks/queries/useGetAccountBalance';
import {CreateNftParams} from '@mlem-admin/services/admin/nft/types';
import {Benefit} from '@mlem-admin/types/benefit';
import {NftCollection} from '@mlem-admin/types/nft-collection';
import {AutocompleteElement, FormContainer, SelectElement, useForm, useWatch, TextFieldElement} from 'react-hook-form-mui';
import {useQueryClient} from 'react-query';

type FormTiersProps = {
  nftCollections: NftCollection[];
};

const FormTiersWatch = ({nftCollections}: FormTiersProps) => {
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
    <FormTiers
      name={'tierId'}
      nftCollectionId={foundNftCollection?.id}
    />
  );
};

type FormProps = {
  onSuccess?: () => void;
};
const ESTIMATE_FEE = 20;

const ItemCreate = ({onSuccess}: FormProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const {toastSuccess, toastError} = useI18nToast();
  const queryClient = useQueryClient();
  const {publicKey} = useAccount();
  const {data: {balance = 0} = {balance: 0}} = useGetAccountBalance({
    publicKey,
  });

  const {
    data: {items = []} = {items: [], total: 0},
    isLoading: isLoadingBenefits,
  } = useGetBenefits();
  const createNftMutation = useMutateCreateNft({
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: [QueryKeys.LIST_NFTS]});
      toastSuccess('item_updated');
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
    data: {items: nftCollections} = {items: [], total: 0},
    isLoading: isLoadingCollections,
  } = useGetAllNftCollections();

  return (
    <>
      <div className="flex justify-start items-center w-full">
        <Button
          className="cursor-pointer flex items-center justify-center w-full"
          leftIcon={
            <Img
              className="h-6 mr-2"
              src="/v2/images/img_lock.svg"
              alt="lock"
            />
          }
          shape="round"
          color="amber_500"
          size="sm"
          variant="fill"
          type="button"
          onClick={openPopup}
        >
          <div className="!text-black-900_01 font-lexend font-semibold text-base text-center">
            Mint NFT
          </div>
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          formContext={formContext}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Mint NFT</Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-3 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Name (*)
                  </Text>
                  <TextFieldElement name="name" required
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    NFT Collection (*)
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <SelectElement
                      // label="NFT Collection"
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Image Url (*)
                  </Text>
                  <TextFieldElement name="imageUrl" required
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Benefits
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <AutocompleteElement
                      // label="Benefits"
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
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Tiers
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <FormTiersWatch nftCollections={nftCollections} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full relative">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Estimated Fee
                  </Text>
                  <div className="absolute right-5">
                    <Text
                      className="bg-red-600 px-2 py-0.5 rounded-sm text-[13px] m-1 text-white-A700 w-auto"
                      size="txtLexendSemiBold14Gray300"
                    >{ESTIMATE_FEE} CSPR</Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full relative">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    By default, the NFT will have the benefits of the NFT Collection. You can add extra benefits by choosing more from this list.
                  </Text>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-50 relative">
            <div className="relative w-full h-[20px]">
              <Button
                className="absolute left-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded bg-gray-500"
                onClick={() => setOpenModal(false)}>Decline</Button>
              <Button
                className={`absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded  ${
                  isLoadingCollections ||
                  isLoadingBenefits ||
                  createNftMutation.isLoading
                    ? 'bg-gray-500' : 'bg-indigo-500'
                }`}
                type="submit"
                disabled={
                  balance < ESTIMATE_FEE
                }
              >Confirm</Button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ItemCreate;
