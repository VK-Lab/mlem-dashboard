import ImgAppleStore from '@mlem-admin/assets/images/apple-store.webp';
import ImgGooglePlay from '@mlem-admin/assets/images/google-store.webp';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image'; // No wrapper

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  padding: '20px 0 0',
  justifyContent: 'space-evenly',
}));

const StyledBoxColumn = styled(Box)(() => ({
  flex: '0 0 auto',
  width: '45%',
  '& img': {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const AppDownloadLinks = () => {
  return (
    <StyledBox>
      <StyledBoxColumn>
        <a
          href="https://apple.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Download from Apple Store"
        >
          <Image src={ImgAppleStore} alt="Download from Apple Store" />
        </a>
      </StyledBoxColumn>
      <StyledBoxColumn>
        <a
          href="https://google.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          title="Download from Google Play"
        >
          <Image src={ImgGooglePlay} alt="Download from Google Play" />
        </a>
      </StyledBoxColumn>
    </StyledBox>
  );
};

export default AppDownloadLinks;
