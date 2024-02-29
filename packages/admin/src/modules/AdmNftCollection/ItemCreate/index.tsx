import React from "react";

import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {Img} from '@mlem-admin/components/Img';
import {Button} from "@mlem-admin/components/Button";
import {Text} from "@mlem-admin/components/Text";
import SelectBrokerField from "@mlem-admin/modules/AdmNftCollection/SelectBrokerField";
import SelectBenefitsField from "@mlem-admin/modules/AdmNftCollection/SelectBenefitsField";

const AdmNftCollectionItemCreate = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup() {
    setOpenModal(true);
  }

  return (
    <>
      <div className="flex justify-end items-end">
        <Button
          className="cursor-pointer flex items-center justify-center min-w-[192px]"
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
            Create NFT Collection
          </div>
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            // name: props.item.name,
            // description: props.item.description,
            // benefitIds: props.item.benefitIds,
            // nftImageUrl: props.item.nftImageUrl,
            // brokerId: props.item.brokerId,
          }}
          // onSuccess={handleOnSubmitForm}
          onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Create NFT Collection</Modal.Header>
          <Modal.Body className="bg-gray-50">
            <div className="flex md:flex-1 flex-col gap-2 items-start justify-start w-full">

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

export default AdmNftCollectionItemCreate;
