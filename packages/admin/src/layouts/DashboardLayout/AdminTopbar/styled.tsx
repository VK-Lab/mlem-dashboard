import { ICustomTheme } from '@mlem/admin/theme/index';
import { AppBar, AppBarProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface AppbarCustomProps extends AppBarProps {
  theme?: ICustomTheme;
}

const StyledAppbar = styled((props: AppbarCustomProps) => (
  <AppBar {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  boxShadow: theme.customShadows[2],
}));

export { StyledAppbar };
