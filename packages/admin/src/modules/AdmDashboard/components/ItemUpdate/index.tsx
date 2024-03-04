import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import FormNftCollections from '@mlem-admin/modules/AdmDashboard/components/FormNftCollections';

import {Button} from '@mlem-admin/components/Button';
import {Text} from "@mlem-admin/components/Text";
import dayjs from 'dayjs';

import {BsPencil} from "react-icons/bs";
import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {useQueryClient} from 'react-query';
import {useMutateUpdateCampaign} from "@mlem-admin/hooks/mutations";
import {QueryKeys} from "@mlem-admin/enums/queryKeys.enum";
import {UpdateCampaignParams} from "@mlem-admin/services/admin/campaign/types";
import {useI18nToast} from "@mlem-admin/hooks/useToast";

const ItemUpdate = (props) => {

  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  const queryClient = useQueryClient();
  const {toastSuccess} = useI18nToast();
  const updateCampaignMutation = useMutateUpdateCampaign({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({queryKey: [QueryKeys.CAMPAIGNS]});
      setOpenModal(false);
    },
  });
  const handleOnSubmitForm = (updateCampaignParams: UpdateCampaignParams) => {
    updateCampaignMutation.mutate({
      ...updateCampaignParams,
      id: props.item.id,
    });
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="absolute -right-1 -top-1 !text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center w-[26px] p-[5px] rounded bg-indigo-500">
        <BsPencil/>
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            name: props.item.name,
            description: props.item.description,
            startDate: props.item.startDate ? dayjs(props.item.startDate) : undefined,
            endDate: props.item.endDate ? dayjs(props.item.endDate) : undefined,
            imageUrl: props.item.imageUrl,
            nftCollectionIds: props.item.nftCollectionIds,
            thumbnailUrl: props.item.thumbnailUrl,
            type: 'free_mint',
            shortDescription: props.item.description,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Update Campaign</Modal.Header>
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
                    Type (*)
                  </Text>
                  <SelectElement
                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"
                    name="type" required
                    options={[
                      {
                        id: 'free_mint',
                        label: 'Free Mint'
                      }
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Thumbnail URL
                  </Text>
                  <TextFieldElement name="thumbnailUrl" value={props.item.thumbnailUrl}
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Image URL (*)
                  </Text>
                  <TextFieldElement name="imageUrl" required value={props.item.imageUrl}
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    Start Date (*)
                  </Text>
                  <DatePickerElement
                    name="startDate" required
                    className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"

                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    End Date (*)
                  </Text>
                  <DatePickerElement
                    name="endDate" required
                    className="!placeholder:text-gray-600 !text-gray-600 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"

                  />
                </div>
              </div>
              <div className="flex flex-col items-start justify-start w-full">
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <Text
                    className="text-gray-950 text-sm w-auto"
                    size="txtLexendSemiBold14"
                  >
                    NFT Collections (*)
                  </Text>
                  <div className="acm-ele-wrapper w-full">
                    <FormNftCollections
                      name="nftCollectionIds"
                      campaignId={props.item.id}
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

export default ItemUpdate;
