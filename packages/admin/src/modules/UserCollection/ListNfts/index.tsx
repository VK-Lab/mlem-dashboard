import EmptyData from '@mlem/admin/components/EmptyData';
// import mockResult from './mock';
import WrappedLink from '@mlem/admin/components/Link';
import NFTItem from '@mlem/admin/components/NFTItem';
import { Paths } from '@mlem/admin/enums/paths.enum';
import { useGetNfts } from '@mlem/admin/hooks/queries';
import { Nft } from '@mlem/admin/types/nft';
import { generatePath } from '@mlem/admin/utils/path';
import { Grid } from '@mui/material';

const ListNfts = () => {
  const { data: nfts = [] } = useGetNfts();

  if (!nfts?.length) {
    return (
      <Grid container>
        <Grid item xs={12}>
          <EmptyData />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container columnSpacing={3} rowSpacing={{ xs: 3, sm: 4 }}>
      {nfts.map((nft: Nft, i: number) => (
        <Grid
          key={`nft-grid--${i}`}
          item
          xs={3}
          sm={3}
          sx={{ cursor: 'pointer' }}
          minWidth={'262px'}
        >
          <WrappedLink
            href={{
              pathname: generatePath(Paths.NFT_DETAIL, {
                tokenAddress: nft.tokenAddress,
              }),
              query: {
                tokenId: nft.tokenId,
              },
            }}
            passHref
          >
            <NFTItem
              image={nft.imageUrl}
              name={nft.name}
              contractType={nft.contractType}
              description={nft.description}
            />
          </WrappedLink>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListNfts;
