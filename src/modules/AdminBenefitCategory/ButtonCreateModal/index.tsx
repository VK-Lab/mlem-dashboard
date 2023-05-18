import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FormContainer } from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateBenefitCategory } from '@/hooks/mutations';
import { BenefitCategory } from '@/types/benefit-category';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type BenefitCategoryFormProps = {
  onSuccess: (data: BenefitCategory) => void;
};

const BenefitCategoryForm = ({ onSuccess }: BenefitCategoryFormProps) => {
  return (
    <FormContainer defaultValues={{ name: '' }} onSuccess={onSuccess}>
      <StyledTextFieldElement name="name" label="Name" required />
      <Box mt="2rem">
        <LoadingButton
          fullWidth
          type={'submit'}
          color={'primary'}
          variant={'contained'}
        >
          Create
        </LoadingButton>
      </Box>
    </FormContainer>
  );
};

const ButtonCreateModal = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const createBenefitMutation = useMutateCreateBenefitCategory({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created benefit successfully!',
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKeys.BENEFIT_CATEGORIES],
      });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (benefitCategory: BenefitCategory) => {
    createBenefitMutation.mutate(benefitCategory);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create Benefit Category
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Benefit Category
          </Typography>
          <Box mt={2}>
            <BenefitCategoryForm onSuccess={handleOnSubmitForm} />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
