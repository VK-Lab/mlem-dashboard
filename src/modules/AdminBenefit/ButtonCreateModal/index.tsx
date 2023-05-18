import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {
  FormContainer,
  SelectElement,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form-mui';
import { useQueryClient } from 'react-query';
import * as yup from 'yup';

import { StyledTextFieldElement } from './styled';
import ToastMessage from '@/components/Toast';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateCreateBenefit } from '@/hooks/mutations';
import { useGetAdminBenefitCategories } from '@/hooks/queries';
import { Benefit } from '@/types/benefit';
import { BenefitCategory } from '@/types/benefit-category';

export enum BeneiftSourceEnum {
  WOOCOMMERCE = 'woocommerce',
  MANUAL = 'manual',
}

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

type BenefitFormProps = {
  onSuccess: (data: Benefit) => void;
  isSubmitting: boolean;
};

const DiscountsField = () => {
  const { control } = useFormContext();
  const source = useWatch({
    control,
    name: 'source',
  });

  if (source !== BeneiftSourceEnum.WOOCOMMERCE) {
    return null;
  }

  return (
    <StyledTextFieldElement
      type="number"
      name="amount"
      label="Discounts (%)"
      required
    />
  );
};

const validationSchema = yup.object({
  amount: yup
    .number()
    .typeError('Total must be number')
    .min(1)
    .max(100)
    .optional(),
  name: yup.string().required('This field is required'),
});

const BenefitForm = ({ onSuccess, isSubmitting }: BenefitFormProps) => {
  const { data: { items } = { items: [] } } = useGetAdminBenefitCategories();
  const formContext = useForm<Benefit>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(validationSchema),
  });

  return (
    <FormContainer
      formContext={formContext}
      defaultValues={{ name: '' }}
      onSuccess={onSuccess}
    >
      <StyledTextFieldElement name="name" label="Name" required />
      <StyledTextFieldElement name="description" label="Description" />
      <Box mt="1rem">
        <SelectElement
          label="Benefit Category"
          name="categoryId"
          sx={{
            width: '100%',
          }}
          options={items.map((benefitCategory: BenefitCategory) => {
            return {
              id: benefitCategory.id,
              label: benefitCategory.name,
            };
          })}
          required
        />
      </Box>
      <Box mt="1rem">
        <SelectElement
          label="Source"
          name="source"
          sx={{
            width: '100%',
          }}
          options={[
            {
              id: BeneiftSourceEnum.MANUAL,
              label: 'Manual',
            },
            {
              id: BeneiftSourceEnum.WOOCOMMERCE,
              label: 'WooCommerce',
            },
          ]}
          required
        />
        <DiscountsField />
      </Box>
      <Box mt="1.5rem">
        <LoadingButton
          type={'submit'}
          color={'primary'}
          variant={'contained'}
          fullWidth
          disabled={isSubmitting}
          loading={isSubmitting}
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
  const createBenefitMutation = useMutateCreateBenefit({
    onSuccess: async () => {
      ToastMessage({
        type: 'success',
        message: 'Created benefit successfully!',
      });
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.BENEFITS] });
      handleClose();
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOnSubmitForm = (benefit: Benefit) => {
    createBenefitMutation.mutate({
      ...benefit,
      amount: benefit.amount ? Number(benefit.amount) : undefined,
    });
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleOpen}>
        Create Benefit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Benefit
          </Typography>
          <Box mt={2}>
            <BenefitForm
              onSuccess={handleOnSubmitForm}
              isSubmitting={createBenefitMutation.isLoading}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ButtonCreateModal;
