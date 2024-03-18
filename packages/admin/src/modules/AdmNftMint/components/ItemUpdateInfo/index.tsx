import { useState } from 'react';

import { Text } from '@mlem-admin/components/Text';
import { QueryKeys } from '@mlem-admin/enums/queryKeys.enum';
import { useMutateUpdateNft } from '@mlem-admin/hooks/mutations';
import { useGetBenefits } from '@mlem-admin/hooks/queries';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import FormTiers from '@mlem-admin/modules/AdmNftMint/components/FormTiers';
import { UpdateNftParams } from '@mlem-admin/services/admin/nft/types';
import { Benefit } from '@mlem-admin/types/benefit';
import { Nft } from '@mlem-admin/types/nft';
import { Modal } from 'flowbite-react';
import {
  FormContainer,
  TextFieldElement,
  AutocompleteElement,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

interface ItemUpdateInfoProps {
  item: Nft;
}

const ItemUpdateInfo = ({ item }: ItemUpdateInfoProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const { toastSuccess } = useI18nToast();
  const { data: { items = [] } = { items: [], total: 0 } } = useGetBenefits();
  const queryClient = useQueryClient();
  const updateNftMutation = useMutateUpdateNft({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.LIST_NFTS] });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (updateNftParams: UpdateNftParams) => {
    updateNftMutation.mutate({
      ...updateNftParams,
      id: item.id,
    });
  };

  return (
    <>
      <div
        className="px-1 py-1 cursor-pointer hover:text-white-A700 hover:bg-gray-500"
        onClick={openPopup}
      >
        Update
      </div>

      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        position={modalPlacement}
        size="3xl"
      >
        <FormContainer
          defaultValues={{
            name: item.name,
            description: item.description,
            benefits: item.benefits
              ? item.benefits.map((benefit: Benefit) => benefit.id.toString())
              : [],
            tierId: item.tierId,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">
            Update NFT
          </Modal.Header>
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
                  <TextFieldElement
                    name="name"
                    required
                    value={item.name}
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Description
                  </Text>
                  <TextFieldElement
                    name="description"
                    value={item.description}
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                  />
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
                    <FormTiers
                      name={'tierId'}
                      nftCollectionId={item?.nftCollection?.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-gray-50 relative">
            <div className="relative w-full h-[20px]">
              <button
                className="absolute left-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[8px] rounded bg-gray-500"
                type="button"
                onClick={() => setOpenModal(false)}
              >
                Decline
              </button>
              <button
                className="absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[8px] rounded bg-indigo-500"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default ItemUpdateInfo;
