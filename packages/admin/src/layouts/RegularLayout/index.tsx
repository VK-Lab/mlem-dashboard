import React, { ReactNode } from 'react';

import RegularAppbar from '@mlem-admin/layouts/RegularLayout/RegularAppbar';
import { Toolbar, Box, Container } from '@mui/material';

type Props = {
  children?: ReactNode;
};

const RegularLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <RegularAppbar />
      <Box>
        <Toolbar />
        <Container disableGutters maxWidth={false}>
          {children}
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default RegularLayout;
