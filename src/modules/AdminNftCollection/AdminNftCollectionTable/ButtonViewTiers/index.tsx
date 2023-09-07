import Button from '@mui/material/Button';
import Link from 'next/link';

type Props = {
  nftCollectionId: string;
};

const ButtonViewTiers = ({ nftCollectionId }: Props) => {
  return (
    <Link href={`/admin/nft-collections/${nftCollectionId}/tiers`}>
      <Button variant="contained">Manage Tiers</Button>
    </Link>
  );
};

export default ButtonViewTiers;
