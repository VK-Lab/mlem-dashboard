import * as React from 'react';

import AppsIcon from '@mui/icons-material/Apps';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useRouter } from 'next/router';

import { AdminPaths } from '@/enums/paths.enum';

const MENU_ITEMS = [
  {
    name: 'Campaigns',
    path: AdminPaths.CAMPAIGNS,
    icon: <AppsIcon />,
  },
  {
    name: 'Claims',
    path: AdminPaths.CLAIMS,
    icon: <AppsIcon />,
  },
  {
    name: 'Benefits',
    path: AdminPaths.BENEFITS,
    icon: <AppsIcon />,
  },
  {
    name: 'Benefit Categories',
    path: AdminPaths.BENEFIT_CATEGORIES,
    icon: <AppsIcon />,
  },
  {
    name: 'NFTs',
    path: AdminPaths.NFTS,
    icon: <AppsIcon />,
  },
  {
    name: 'NFT Collections',
    path: AdminPaths.NFT_COLLECTIONS,
    icon: <AppsIcon />,
  },
];

export default function NestedList({ maxWidth = 360 }) {
  const router = useRouter();

  const handleOnClick = (path: AdminPaths) => {
    router.push(path);
  };

  return (
    <>
      <List dense sx={{ maxWidth, pt: 3 }} component="nav">
        {MENU_ITEMS.map((item) => (
          <ListItemButton
            selected={Boolean(router.asPath === item.path)}
            key={item.name}
            onClick={() => handleOnClick(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItemButton>
        ))}
      </List>

      {/* <List
        dense
        sx={{ maxWidth }}
        component="nav"
        subheader={
          <ListSubheader component="div">Campaign Settings</ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="Campaigns" />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List dense component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <DataSaverOffIcon />
              </ListItemIcon>
              <ListItemText primary="Data overal" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <List
        dense
        sx={{ maxWidth }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={<ListSubheader component="div">Settings</ListSubheader>}
      >
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </List> */}
    </>
  );
}
