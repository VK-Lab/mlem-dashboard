import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import { useQueryClient } from 'react-query';

import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateRegisterTokenOwner } from '@/hooks/mutations';
import { useI18nToast } from '@/hooks/useToast';
import { NftCollection } from '@/types/nft-collection';

type Props = {
  nftCollection: NftCollection;
};

const ButtonRegisterTokenOwner = ({ nftCollection }: Props) => {
  const client = useQueryClient();
  const { toastSuccess } = useI18nToast();
  const { mutate, isLoading } = useMutateRegisterTokenOwner({
    onSuccess: async () => {
      toastSuccess('success');
      await client.invalidateQueries([QueryKeys.NFT_COLLECTIONS]);
    },
  });

  const handleOnClick = () => {
    mutate({
      id: nftCollection.id,
      name: nftCollection.name,
    });
  };

  return (
    <Box>
      <LoadingButton
        variant="contained"
        onClick={handleOnClick}
        loading={isLoading}
      >
        Register
      </LoadingButton>
    </Box>
  );
};

export default ButtonRegisterTokenOwner;
