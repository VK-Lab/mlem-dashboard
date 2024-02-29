import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {Text} from "@mlem-admin/components/Text";
import {Button} from "@mlem-admin/components/Button";

import {useQueryClient} from 'react-query';
import {useI18nToast} from "@mlem-admin/hooks/useToast";
import {useMutateUpdateNftCollection} from "@mlem-admin/hooks/mutations";
import {QueryKeys} from "@mlem-admin/enums/queryKeys.enum";
import {UpdateNftCollectionParams} from "@mlem-admin/services/admin/nft-collection/types";
import SelectBrokerField from "@mlem-admin/modules/AdmNftCollection/SelectBrokerField";
import SelectBenefitsField from "@mlem-admin/modules/AdmNftCollection/SelectBenefitsField";

const AdmNftCollectionItemUpdateInfo = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const queryClient = useQueryClient();
  const {toastSuccess} = useI18nToast();
  const updateNftMutation = useMutateUpdateNftCollection({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (
    updateNftCollectionParams: UpdateNftCollectionParams
  ) => {
    updateNftMutation.mutate({
      ...updateNftCollectionParams,
      id: props.item.id,
    });
  };

  return (
    <>
      <div className="px-1 py-1 cursor-pointer hover:text-white-A700 hover:bg-gray-500"
           onClick={openPopup}
      >
        Update
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            name: props.item.name,
            description: props.item.description,
            benefitIds: props.item.benefitIds,
            nftImageUrl: props.item.nftImageUrl,
            brokerId: props.item.brokerId,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Update NFT Collection</Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-2 items-start justify-start w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Name (*)
                  </Text>
                  <TextFieldElement name="name" required value={props.item.name}
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Short Description
                  </Text>
                  <TextFieldElement name="description" value={props.item.description}
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    NFT Image URL
                  </Text>
                  <TextFieldElement name="nftImageUrl" required value={props.item.nftImageUrl}
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Broker
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <SelectBrokerField
                      name="brokerId"
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
                    Benefits
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <SelectBenefitsField
                      name="benefitIds"
                    />
                  </div>
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
                className="absolute right-0 -top-4 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center p-[13px] rounded bg-indigo-500"
                type="submit">Confirm</Button>
            </div>
          </Modal.Footer>
        </FormContainer>
      </Modal>
    </>
  );
};

export default AdmNftCollectionItemUpdateInfo;
