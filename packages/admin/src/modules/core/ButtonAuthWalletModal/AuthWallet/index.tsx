import { useState } from 'react';

import AppDownloadLinks from '@mlem-admin/components/AppDownloadLinks';
import { useI18nToast } from '@mlem-admin/hooks/useToast';
import {
  registerPhoneNumber,
  verifyPhoneNumber,
} from '@mlem-admin/services/auth';
import { Box, Typography } from '@mui/material';
import { useMutation } from 'react-query';

import { StyledButton, StyledMuiTelInput, StyledWelcomeBlock } from './styled';

type Props = {
  onSuccess?: () => void;
};

const AuthWallet = ({ onSuccess }: Props) => {
  const { toastSuccess } = useI18nToast();

  const [step, setStep] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp] = useState<string>('');

  const verifyPhoneNumbertMutation = useMutation({
    mutationFn: verifyPhoneNumber,
    mutationKey: 'verifyPhoneNumber',
    onSuccess: () => {
      toastSuccess('signup_success');
      onSuccess?.();
    },
  });

  const registerPhoneNumberMutation = useMutation({
    mutationFn: registerPhoneNumber,
    mutationKey: 'registerPhoneNumber',
    onSuccess: () => {
      setStep((prevStep) => prevStep + 1);
    },
  });

  const onPhoneChange = (newValue: string) => {
    setPhoneNumber(newValue);
  };

  const onContinueHandler = () => {
    switch (step) {
      case 0:
        registerPhoneNumberMutation.mutate({
          phoneNumber: phoneNumber.replaceAll(' ', ''),
        });
        break;
      case 1:
        verifyPhoneNumbertMutation.mutate({ otpCode: otp });
        break;
      default:
    }
  };

  return (
    <StyledWelcomeBlock>
      <Typography sx={{ fontSize: 32, mb: 3 }} variant="h2" gutterBottom>
        Link Wallet to Loyalty App
      </Typography>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" gutterBottom>
          Download Melem Loyalty App
        </Typography>
        <Typography variant="body2" gutterBottom>
          Download the Loyalty App and register new account to earn our
          exclusive benefits.
        </Typography>
        <AppDownloadLinks />
      </Box>
      <Box sx={{ mb: 2.5 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 1.5 }}>
          {step === 0 ? `Enter phone number` : `Enter OTP`}
        </Typography>
        <Box>
          {step === 0 && (
            <StyledMuiTelInput
              disableDropdown
              defaultCountry="VN"
              value={phoneNumber}
              onChange={onPhoneChange}
              forceCallingCode
              onlyCountries={['VN']}
              className="test"
              fullWidth
            />
          )}
        </Box>
      </Box>
      <StyledButton
        fullWidth
        variant="contained"
        size="large"
        onClick={onContinueHandler}
        disabled={verifyPhoneNumbertMutation.isLoading}
      >
        Continue
      </StyledButton>
    </StyledWelcomeBlock>
  );
};

export default AuthWallet;
