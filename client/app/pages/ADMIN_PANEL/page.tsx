"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PageOgrenciTable from './ogrenci_islemleri/ogrenci_list/page';
import OgrenciIslemleriTabs from './ogrenci_islemleri/page';

const drawerWidth = 240;

const AdminPanel = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState<string>('Genel Bilgiler');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: 'Genel Bilgiler', content: 'GenelBilgiler' },
    { label: 'Öğrenci Bilgileri', content: 'OgrenciBilgileri' },
    { label: 'Akademisyen Bilgileri', content: 'AkademisyenBilgileri' },
    { label: 'Ders Bilgileri', content: 'DersBilgileri' },
    { label: 'Ders Kayıt Bilgileri', content: 'DersKayitBilgileri' },
    { label: 'Çıkış', content: 'Cikis' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'GenelBilgiler':
        return <PageOgrenciTable />;
      case 'OgrenciBilgileri':
        return <OgrenciIslemleriTabs />;
      default:
        return <div>Seçilen içerik bulunamadı.</div>;
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => setActiveMenu(item.content)}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Paneli
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h5" gutterBottom>
          {activeMenu}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminPanel; 
