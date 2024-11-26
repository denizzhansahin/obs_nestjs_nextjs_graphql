import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';
import { Assignment, Class, Edit, Group, ListAlt, ManageAccounts, Person, PersonAddAlt1, SupervisorAccount } from '@mui/icons-material';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'genel_kontrol',
    title: 'Genel Kontrol',
    icon: <DashboardIcon />,
  },
  {
    segment: 'kullanici_islemleri',
    title: 'Kullanıcı İşlemleri',
    icon: <ManageAccounts />,
    children: [
      {
        segment: 'kullanici_list',
        title: 'Kullanıcı Listesi',
        icon: <ListAlt />,
      },
      {
        segment: 'kullanici_edit',
        title: 'Kullanıcı Bilgi Düzenleme',
        icon: <Edit />,
      },
      {
        segment: 'kullanici_ekle',
        title: 'Kullanıcı Ekle',
        icon: <PersonAddAlt1 />,
      },
    ],
  },
  {
    segment: 'ogrenci_islemleri',
    title: 'Öğrenci İşlemleri',
    icon: <Group />,
    children: [
      {
        segment: 'ogrenci_list',
        title: 'Öğrenci Listesi',
        icon: <ListAlt />,
      },
      {
        segment: 'ogrenci_edit',
        title: 'Öğrenci Bilgi Düzenleme',
        icon: <Edit />,
      },
      {
        segment: 'ogrenci_ekle',
        title: 'Öğrenci Ekle',
        icon: <PersonAddAlt1 />,
      },
    ],
  },
  {
    segment: 'akademisyen_islemleri',
    title: 'Akademisyen İşlemleri',
    icon: <SupervisorAccount />,
    children: [
      {
        segment: 'akademisyen_list',
        title: 'Akademisyen Listesi',
        icon: <ListAlt />,
      },
      {
        segment: 'akademisyen_edit',
        title: 'Akademisyen Bilgi Düzenleme',
        icon: <Edit />,
      },
      {
        segment: 'akademisyen_ekle',
        title: 'Akademisyen Ekle',
        icon: <PersonAddAlt1 />,
      },
    ],
    
  },
  {
    segment: 'ders_islemleri',
    title: 'Ders İşlemleri',
    icon: <Class />,
  },
  {
    segment: 'ders_kayit_islemleri',
    title: 'Ders Kayıt İşlemleri',
    icon: <Assignment />,
  },


];

const BRANDING = {
  title: 'Eğitim ve Öğrenci Yönetim Sistemi',
  logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />
};



export default function RootLayout(props: { children: React.ReactNode }) {
  

  return (
    <html lang="tr" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <AppProvider
              navigation={NAVIGATION}
              branding={BRANDING}
              
              theme={theme}
            >
              {props.children}
            </AppProvider>
          </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
