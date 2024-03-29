import BackButton from '@mlem-admin/components/BackButton';
import { CardImage } from '@mlem-admin/components/CardImage';
import { useGetNft } from '@mlem-admin/hooks/queries';
import { StyledDashboardSection } from '@mlem-admin/layouts/DashboardLayout/styled';
import RegularLayout from '@mlem-admin/layouts/RegularLayout';
import { formatAddress } from '@mlem-admin/utils/format';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Container,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';

import ListBenefits from './ListBenefits';
import {
  StyledBoxRight,
  StyledAccordionDetails,
  StyledNFTImageBox,
  StyledBoxBenefitsWrapper,
} from './styled';

const UserNFTDetail = () => {
  const router = useRouter();
  const { tokenAddress, tokenId } = router.query;

  const { data: nft } = useGetNft(
    {
      contractPackageHash: tokenAddress as string,
      tokenId: tokenId as string,
    },
    {
      enabled: router.isReady,
    }
  );

  const data = [
    {
      label: 'Contract Address',
      value: formatAddress(nft?.tokenAddress),
    },
    {
      label: 'Token ID',
      value: nft?.tokenId,
    },
    {
      label: 'Contract Type',
      value: nft?.contractType,
    },
    {
      label: 'Tier',
      value: nft?.tier?.name,
    },
  ];
  return (
    <RegularLayout>
      <Container maxWidth="xl">
        <StyledDashboardSection sx={{ mt: 3, pt: 6, pb: 6 }}>
          <Grid container spacing={2} sx={{ maxWidth: '1140px' }}>
            <Grid item xs={12} sx={{ mb: 3 }}>
              <BackButton />
            </Grid>
            <Grid item xs={12} sm={5} sx={{ height: '100%' }}>
              <StyledNFTImageBox sx={{ marginTop: '16px' }}>
                <CardImage src={nft?.imageUrl} />
              </StyledNFTImageBox>
            </Grid>
            <Grid item xs={12} sm={7}>
              <StyledBoxRight>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h2"
                    sx={{ fontSize: 38, fontWeight: 700 }}
                  >
                    {nft?.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: 13, fontWeight: 500 }}
                  >
                    Creator: <strong>{formatAddress(nft?.ownerOf)}</strong>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ mb: 6 }}>
                    {nft?.description}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      mb: 2.5,
                      pb: 1.5,
                      borderBottom: '1px solid #E3EBF4',
                    }}
                  >
                    Benefits
                  </Typography>
                  <StyledBoxBenefitsWrapper>
                    <ListBenefits
                      nftId={nft?.id}
                      benefits={nft?.benefits}
                      claims={nft?.claims}
                    />
                  </StyledBoxBenefitsWrapper>
                </Box>
                <Box mt={4}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: 20,
                      fontWeight: 700,
                      mb: 2.5,
                      pb: 1.5,
                      borderBottom: '1px solid #E3EBF4',
                    }}
                  >
                    Addition Information
                  </Typography>
                  <StyledAccordionDetails>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <ReceiptIcon sx={{ color: '#929AA5', mr: 1.5 }} />
                      <Typography>Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <List
                          dense
                          sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                          }}
                        >
                          {data.map((item) => (
                            <ListItem
                              key={item.label}
                              disableGutters
                              secondaryAction={
                                <Typography sx={{ fontSize: 14 }}>
                                  {item.value}
                                </Typography>
                              }
                            >
                              <ListItemText primary={item.label} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </AccordionDetails>
                  </StyledAccordionDetails>
                </Box>
              </StyledBoxRight>
            </Grid>
          </Grid>
        </StyledDashboardSection>
      </Container>
    </RegularLayout>
  );
};

export default UserNFTDetail;
