import {Modal} from 'flowbite-react';
import {useState} from 'react';

import {DatePickerElement, FormContainer, TextFieldElement, SelectElement} from 'react-hook-form-mui';
import {Text} from "@mlem-admin/components/Text";
import {Button} from "@mlem-admin/components/Button";

const AdmNftCollectionItemUpdateTierCreate = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement] = useState('center');

  function openPopup () {
    setOpenModal(true);
  }

  return (
    <>
      <div className="px-1 py-1 cursor-pointer"
           onClick={openPopup}
      >
        Create Tier
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)} position={modalPlacement} size="3xl">
        <FormContainer
          defaultValues={{
            // name: props.item.name,
            // description: props.item.description,
            // startDate: props.item.startDate ? dayjs(props.item.startDate) : undefined,
            // endDate: props.item.endDate ? dayjs(props.item.endDate) : undefined,
            // imageUrl: props.item.imageUrl,
            // nftCollectionIds: props.item.nftCollectionIds,
            // thumbnailUrl: props.item.thumbnailUrl,
            // type: 'free_mint',
            // shortDescription: props.item.description,
          }}
          // onSuccess={handleOnSubmitForm}
          onSuccess={data => console.log(data)}
        >
          <Modal.Header className="bg-gray-50 text-gray-950 uppercase">Create Tier</Modal.Header>
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

export default AdmNftCollectionItemUpdateTierCreate;
