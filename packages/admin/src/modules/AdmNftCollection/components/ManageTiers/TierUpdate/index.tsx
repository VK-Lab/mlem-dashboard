import React from "react";

import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {QueryKeys} from '@mlem-admin/enums/queryKeys.enum';
import {useMutateUpdateTier} from '@mlem-admin/hooks/mutations/useMutateUpdateTier';
import {useI18nToast} from '@mlem-admin/hooks/useToast';
import FormBenefits from '@mlem-admin/modules/AdmNftCollection/components/FormBenefits';
import {UpdateTierParams} from '@mlem-admin/services/admin/tier/types';
import {Tier} from '@mlem-admin/types/tier';
import {useQueryClient} from 'react-query';
import {BsPencil} from "react-icons/bs";
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";

type TierItem = {
  tier: Tier;
};
const TierUpdate = ({tier}: TierItem) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  const queryClient = useQueryClient();
  const {toastSuccess} = useI18nToast();
  const updateTierMutation = useMutateUpdateTier({
    onSuccess: async () => {
      toastSuccess('item_updated');
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.NFT_COLLECTIONS],
      });
      setOpenModal(false);
    },
  });

  const handleOnSubmitForm = (updateTierParams: UpdateTierParams) => {
    updateTierMutation.mutate({
      ...updateTierParams,
      id: tier.id,
    });
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <Button
          className="!text-white-A700 cursor-pointer font-lexend font-semibold text-base text-center w-[26px] p-[5px] rounded bg-indigo-500"
          type="button"
          onClick={openPopup}
        >
          <BsPencil/>
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            name: tier.name,
            description: tier.description,
            slug: tier.slug,
            benefitIds: tier.benefitIds,
          }}
          onSuccess={handleOnSubmitForm}
          // onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Update Tier</Modal.Header>
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
                    Slug
                  </Text>
                  <TextFieldElement name="slug"
                                    className="!placeholder:text-gray-600 !text-gray-100 font-lexend p-0 text-left text-sm w-full acm-ele-wrapper"/>
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
                  <TextFieldElement name="description"
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
                    <FormBenefits
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

export default TierUpdate;
