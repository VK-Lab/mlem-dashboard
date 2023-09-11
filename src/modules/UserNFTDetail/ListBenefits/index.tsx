import CheckIcon from '@mui/icons-material/Check';
import { Button, Box, ListItem, ListItemText } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useQueryClient } from 'react-query';

import { StyledListItemIcon } from './styled';
import { QueryKeys } from '@/enums/queryKeys.enum';
import { useMutateClaimBenefit } from '@/hooks/mutations';
import { useI18nToast } from '@/hooks/useToast';
import { Benefit } from '@/types/benefit';
import { ClaimStatusEnum } from '@/types/claim';
import { NftClaim } from '@/types/nft';

type Props = {
  nftId?: string;
  benefits?: Benefit[];
  claims?: NftClaim[];
};

const ListBenefits = ({ nftId, benefits = [], claims = [] }: Props) => {
  const queryClient = useQueryClient();
  const toast = useI18nToast();

  const claimNftMutation = useMutateClaimBenefit({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QueryKeys.NFT,
      });
    },
  });

  const handleOnClickClaimBenefit = (benefit: Benefit) => {
    if (!nftId) {
      return;
    }
    claimNftMutation.mutate({ nftId, benefitId: benefit.id });
  };

  const handleOnCopy = (code: string) => {
    copy(code);
    toast.toastSuccess('copied_to_clipboard');
  };

  return (
    <Box sx={{ maxWidth: 480 }}>
      {benefits.map((benefit: Benefit) => {
        const foundClaim = claims.find(
          (claim: NftClaim) => claim.benefitId === benefit.id
        );
        let txt = foundClaim ? foundClaim.status : 'Claim';
        let isCode = false;
        if (
          foundClaim?.status === ClaimStatusEnum.ACCEPTED &&
          foundClaim?.generatedCode
        ) {
          txt = foundClaim?.generatedCode;
          isCode = true;
        }
        const isClaiming =
          claimNftMutation.isLoading &&
          claimNftMutation.variables?.benefitId === benefit.id;
        return (
          <ListItem
            key={`benefit--${benefit.id}`}
            disableGutters
            sx={{ mb: 1 }}
            className="item"
            secondaryAction={
              isCode ? (
                <Button
                  sx={{ minWidth: 120 }}
                  size="small"
                  variant={'outlined'}
                  onClick={() => handleOnCopy(txt)}
                >
                  {isClaiming ? 'Claiming...' : txt}
                </Button>
              ) : (
                <Button
                  sx={{ minWidth: 120 }}
                  size="small"
                  disabled={!!foundClaim || isClaiming}
                  variant={foundClaim ? 'text' : 'contained'}
                  onClick={() => handleOnClickClaimBenefit(benefit)}
                >
                  {isClaiming ? 'Claiming...' : txt}
                </Button>
              )
            }
          >
            <StyledListItemIcon>
              <CheckIcon color={foundClaim ? 'primary' : 'disabled'} />
            </StyledListItemIcon>
            <ListItemText
              sx={{
                m: 0,
                maxWidth: '260px',
              }}
              primaryTypographyProps={{
                variant: 'subtitle2',
              }}
              primary={benefit.name}
            />
          </ListItem>
        );
      })}
    </Box>
  );
};

export default ListBenefits;
