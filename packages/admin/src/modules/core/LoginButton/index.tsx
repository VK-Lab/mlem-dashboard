import { useState } from 'react';

import {
  CasperDashConnector,
  CasperWalletConnector,
  useConnect,
} from '@casperdash/usewallet';
import { LoginTypeEnum } from '@mlem-admin/enums';
import { useOnLogin } from '@mlem-admin/hooks/useOnLogin';
import { Box, Button, Modal, Typography } from '@mui/material';
import Image from 'next/image'; // No wrapper

import { ButtonStyled, ModalContentStyled } from './styled';
import CasperWalletLogo from '~/public/img/casper-wallet.png';
import CasperdashLogo from '~/public/img/casperdash-logo.webp';

type Props = {
  loginType: LoginTypeEnum;
};

const LoginButton = ({ loginType }: Props) => {
  const [open, setOpen] = useState(false);
  useOnLogin({ loginType });

  const { connectAsync: connectCasperDashAsync } = useConnect({
    connector: new CasperDashConnector(),
  });
  const { connectAsync: connectCasperWalletAsync } = useConnect({
    connector: new CasperWalletConnector(),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box>
      <ButtonStyled variant="contained" onClick={() => handleOpen()}>
        CONNECT TO YOUR WALLET
      </ButtonStyled>
      <Modal open={open} onClose={handleClose}>
        <ModalContentStyled>
          <Box>
            <Typography variant="h5" component="h2">
              Connect your wallet
            </Typography>
            <Typography mt="4px" variant="body1">
              To proceed, you need to select a wallet provider and connect your
              account.
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" gap="20px" mt="30px">
            <Button
              variant="contained"
              onClick={() => connectCasperDashAsync()}
              startIcon={
                <Image
                  alt="casperdash-logo"
                  src={CasperdashLogo}
                  width="40"
                  height="30"
                />
              }
            >
              Casperdash
            </Button>
            <Button
              variant="contained"
              onClick={() => connectCasperWalletAsync()}
              startIcon={
                <Box paddingLeft={'28px'} marginRight="10px" paddingTop="5px">
                  <Image
                    alt="casper-wallet-logo"
                    src={CasperWalletLogo}
                    width="20"
                    height="20"
                  />
                </Box>
              }
            >
              Casper Wallet
            </Button>
          </Box>
        </ModalContentStyled>
      </Modal>
    </Box>
  );
};

export default LoginButton;
