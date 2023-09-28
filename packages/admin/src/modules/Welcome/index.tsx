import { LoginTypeEnum } from '@mlem/admin/enums';
import LoginButton from '@mlem/admin/modules/core/LoginButton';
import { Typography } from '@mui/material';
import Image from 'next/image';

import {
  StyledImageOverlay,
  StyledBox,
  StyledWelcomeBlock,
  StyledWelcomePage,
  BoxGradientBG,
} from './styled';
import imageWelcome from '~/public/img/background.jpeg';
import logoD2E from '~/public/img/logo--d2e--yellow.png';

const Welcome = () => {
  return (
    <StyledWelcomePage disableGutters maxWidth={false}>
      <div
        className="d2e--logo"
        style={{ position: 'fixed', left: 24, top: 24, zIndex: 1000 }}
      >
        <Image
          alt="Melem"
          src={logoD2E}
          style={{ height: 'auto', width: 80 }}
        />
      </div>
      <StyledBox className="left">
        <StyledImageOverlay />
        <Image
          alt="Mountains"
          src={imageWelcome}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
            opacity: 0.1,
          }}
        />
      </StyledBox>
      <StyledBox className="right">
        <BoxGradientBG />
        <StyledWelcomeBlock elevation={24}>
          <Typography sx={{ fontSize: 32 }} variant="h2" gutterBottom>
            Welcome to Melem Dashboard
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ mb: 3 }}>
            Connect your wallet to claim the exclusive benefits from VK Venture
          </Typography>
          <LoginButton loginType={LoginTypeEnum.USER} />
        </StyledWelcomeBlock>
      </StyledBox>
    </StyledWelcomePage>
  );
};

export default Welcome;
