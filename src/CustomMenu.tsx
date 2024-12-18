import * as React from 'react';
import { Menu } from 'react-admin';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode'; // Icon for Signature
import GroupsIcon from '@mui/icons-material/Groups';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import KeyIcon from '@mui/icons-material/Key';

export const CustomMenu = (props: any) => {
  return (
    <Menu {...props}>
      {/* Dashboard item */}
      <Menu.DashboardItem />

      {/* Regular Resource Items */}
      <Menu.ResourceItem name="artists" />
      <Menu.ResourceItem name="customers" />
      <Menu.ResourceItem name="orders" />
      <Menu.ResourceItem name="secrets" />
      <Menu.ResourceItem name="promocode" />

      {/* Custom External Link */}
      <ListItemButton
        component="a"
        href="https://shougram-admin-dashboard.vercel.app/signature"
        target="_blank" // Opens link in a new tab
        rel="noopener noreferrer" // Security enhancement for external links
      >
        <ListItemIcon>
          <QrCodeIcon />
        </ListItemIcon>
        <ListItemText primary="Signature" />
      </ListItemButton>
    </Menu>
  );
};
