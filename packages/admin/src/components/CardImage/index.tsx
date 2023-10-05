import { isVideo } from '@mlem-admin/utils/type';
import { Box } from '@mui/material';

import LoadingImage from '../LoadingImage';

type Props = {
  src?: string;
  autoPlay?: boolean;
  controls?: boolean;
};

export const CardImage = ({
  src,
  autoPlay = true,
  controls = false,
}: Props) => {
  if (!src) {
    return null;
  }

  if (!isVideo(src)) {
    return <LoadingImage src={src} layout="fill" alt={''} />;
  }

  return (
    <Box position="relative" height={'300px'}>
      <video
        width="100%"
        height="100%"
        autoPlay={autoPlay}
        controls={controls}
        loop
        style={{
          objectFit: 'contain',
          width: '100%',
          height: '300px',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </Box>
  );
};
