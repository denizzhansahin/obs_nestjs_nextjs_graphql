"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Dashboard, Group, SupervisorAccount, Class, Assignment, Grade, ManageAccounts, AddTask } from "@mui/icons-material";
import Image from "next/image";

import Logo from "../../image/logo.png";
import OgrenciIslemleriTabs from "./ogrenci_islemleri/page";
import AkademisyenIslemleriTabs from "./akademisyen_islemleri/page";
import AkademisyenGorevlendirmeIslemleriTabs from "./akademisyen_ders_gorevlendirme/page";
import DersIslemleriTabs from "./ders_islemleri/page";
import DersKayıtTabs from "./ders_kayit_islemleri/page";
import NotTabs from "./not_islemleri/page";
import KullaniciTabs from "./kullanici_islemleri/page";

const drawerWidth = 240;
const miniDrawerWidth = 70; // Mini Drawer genişliği

const AdminPanel = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false); // Mobil cihazlar için Drawer kontrolü
  const [drawerOpen, setDrawerOpen] = React.useState(false); // Masaüstü cihazlar için Drawer açılıp kapanması
  const [activeMenu, setActiveMenu] = React.useState<string>("Genel Bilgiler");

  const handleDrawerToggle = () => {
    
    setMobileOpen(!mobileOpen); // Mobil Drawer açılır/kapanır.
  };

  const handleDrawerOpen = () => {

    setDrawerOpen(!drawerOpen);
     // Masaüstü Drawer genişler/daralır.
  };


  const handleMenuItemClick = () => {
    if (window.innerWidth <= 768) { // Mobil cihazlar için (768px ve daha küçük)
      if (!drawerOpen) {
        setDrawerOpen(true); // Menü açılır
      } else {
        setDrawerOpen(false); // Menü kapanır
      }
    } else {
      console.log("Masaüstü cihazlarda menü işlemi yapılır.");
    }
  };

  const menuItems = [
    { label: "Genel", content: "GenelIslem", icon: <Dashboard /> },
    { label: "Öğrenci İşlem", content: "Öğrenci İşlem", icon: <Group /> },
    { label: "Akademisyen İşlem", content: "Akademisyen İşlem", icon: <SupervisorAccount /> },
    { label: "Akademisyen Görevlendirme", content: "Akademisyen Görevlendirme", icon: <AddTask /> },
    { label: "Ders İşlem", content: "Ders İşlem", icon: <Class /> },
    { label: "Ders Kayıt", content: "Ders Kayıt", icon: <Assignment /> },
    { label: "Not İşlemleri", content: "Not İşlemleri", icon: <Grade /> },
    { label: "Kullanıcı Yönetimi", content: "Kullanıcı Yönetimi", icon: <ManageAccounts /> },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "Öğrenci İşlem":
        return <div><OgrenciIslemleriTabs/></div>;
      case "Akademisyen İşlem":
        return <div><AkademisyenIslemleriTabs/></div>;
      case "Akademisyen Görevlendirme":
        return <div><AkademisyenGorevlendirmeIslemleriTabs/></div>;
      case "Ders İşlem":
        return <div><DersIslemleriTabs/></div>;
      case "Ders Kayıt":
        return <div><DersKayıtTabs/></div>;
      case "Not İşlemleri":
        return <div><NotTabs/></div>;
      case "Kullanıcı Yönetimi":
        return <div><KullaniciTabs/></div>;
      default:
        return <div>Seçilen içerik: {activeMenu}</div>;
    }
  };
  const drawer = (
    <div>
      <Toolbar />
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: drawerOpen ? 2 : 1, // Genişlik değişimine göre padding ayarı
        }}
      >
        <Image src={Logo} alt="Logo" width={drawerOpen ? 100 : 50} height={drawerOpen ? 100 : 50} />
      </Box>
      <Divider />
      {/* Menü */}
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setActiveMenu(item.content); // Menü öğesini seç
                handleMenuItemClick()
              }}
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? "initial" : "center", // Metin hizalaması
                px: 2.5,
              }}
            >
              <ListItemIcon
              
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              {drawerOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* Üst Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-start", // Elemanları sola hizalar
            alignItems: "center", // Dikeyde ortalama
            gap: 2, // İkon ve yazı arasında boşluk bırakır
          }}
        >
          {/* Sol Menü Butonu */}
          <IconButton
            onClick={handleDrawerOpen}
            sx={{
              color: "white", // Beyaz renk
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Panel Başlığı */}
          <Typography variant="h6" noWrap>
            Eğitim ve Yönetim Sistemi (SuperAdmin Panel)
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobil Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerOpen ? drawerWidth : miniDrawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="menu options"
      >
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Masaüstü Mini/Full Drawer */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerOpen ? drawerWidth : miniDrawerWidth, // Genişlik kontrolü
              transition: "width 0.3s", // Geçiş animasyonu
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Ana İçerik */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : miniDrawerWidth}px)` },
          transition: "width 0.3s", // İçeriğin genişliğini Drawer değişimine göre ayarla
        }}
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
