import { CasperDashConnector, useConnect } from '@casperdash/usewallet';
import { Box } from '@mui/material';

import { StyledButton } from './styled';
import { LoginTypeEnum } from '@/enums';
import { useOnLogin } from '@/hooks/useOnLogin';

const AdminLoginButton = () => {
  useOnLogin({ loginType: LoginTypeEnum.USER });

  const { connectAsync } = useConnect({
    connector: new CasperDashConnector(),
  });

  const handleConnect = async () => {
    await connectAsync();
  };

  return (
    <Box>
      <StyledButton variant="contained" onClick={() => handleConnect()}>
        Connect To Admin Wallet
      </StyledButton>
    </Box>
  );
};

export default AdminLoginButton;
