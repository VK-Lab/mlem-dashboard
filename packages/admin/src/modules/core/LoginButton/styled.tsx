import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const ButtonStyled = styled(Button)`
  padding: ${(props) => {
    return `${props.theme.spacing(2)} ${props.theme.spacing(5)}`;
  }};
  font-weight: 500;
  font-size: ${(props) => props.theme.typography.pxToRem(14)};
  border-radius: ${(props) => props.theme.spacing(4)};
  margin-top: ${(props) => props.theme.spacing(3)};
  width: 100%;
`;

export const ModalContentStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 2px solid #000;
  box-shadow: ${(p) => p.theme.shadows[12]};
  padding: 30px;
  border-radius: ${(props) => props.theme.spacing(2)};
`;
