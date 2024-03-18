import React from 'react';

import { ClaimStatusEnum } from '@mlem-admin/types/claim';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { PopupState as PopupStateProps } from 'material-ui-popup-state/core';

type ClaimButtonMenuProps = {
  onClick?: (claimStatus: ClaimStatusEnum, popupState: PopupStateProps) => void;
  defaultValue?: ClaimStatusEnum;
  popupId?: string;
};

const ClaimButtonMenu: React.FC<ClaimButtonMenuProps> = ({
  onClick,
  defaultValue = ClaimStatusEnum.PENDING,
  popupId,
}) => {
  const handleOnClick = (
    status: ClaimStatusEnum,
    popupState: PopupStateProps
  ) => {
    onClick?.(status, popupState);
  };

  return (
    <PopupState variant="popover" popupId={popupId}>
      {(popupState) => (
        <React.Fragment>
          <Button variant="outlined" size="small" {...bindTrigger(popupState)}>
            {defaultValue}
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={() =>
                handleOnClick(ClaimStatusEnum.ACCEPTED, popupState)
              }
            >
              {ClaimStatusEnum.ACCEPTED}
            </MenuItem>
            <MenuItem
              onClick={() => handleOnClick(ClaimStatusEnum.PENDING, popupState)}
            >
              {ClaimStatusEnum.PENDING}
            </MenuItem>
            <MenuItem
              onClick={() =>
                handleOnClick(ClaimStatusEnum.REJECTED, popupState)
              }
            >
              {ClaimStatusEnum.REJECTED}
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
};

export default ClaimButtonMenu;
