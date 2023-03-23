import { useConnect, CasperDashConnector } from '@casperdash/usewallet';
import { Box } from '@mui/material';

import { StyledButton } from './styled';
import { LoginTypeEnum } from '@/enums';
import { useOnLogin } from '@/hooks/useOnLogin';

const ConnectorButtonMenu = () => {
  useOnLogin({ loginType: LoginTypeEnum.USER });

  const { connectAsync, isLoading } = useConnect({
    connector: new CasperDashConnector(),
  });

  const handleConnect = async () => {
    await connectAsync();
  };

  return (
    <Box>
      <StyledButton
        fullWidth
        variant="contained"
        onClick={() => handleConnect()}
        loading={isLoading}
      >
        Connect To Your Wallet
      </StyledButton>
    </Box>
  );
};

export default ConnectorButtonMenu;
