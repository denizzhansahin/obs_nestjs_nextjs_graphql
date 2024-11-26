import * as React from 'react';
import { AppProvider } from '@toolpad/core/nextjs';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import type { Navigation } from '@toolpad/core/AppProvider';

import theme from '../theme';

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
    segment: 'ogrenci_islemleri',
    title: 'Ogrenci İşlemleri',
    icon: <DashboardIcon />,
  },
  {
    segment: 'akademisyen_islemleri',
    title: 'Akademisyen İşlemleri',
    icon: <DashboardIcon />,
  },
  {
    segment: 'ders_islemleri',
    title: 'Ders İşlemleri',
    icon: <DashboardIcon />,
  },
  {
    segment: 'ders_kayit_islemleri',
    title: 'Ders Kayıt İşlemleri',
    icon: <DashboardIcon />,
  },

];

const BRANDING = {
  title: 'Eğitim ve Öğrenci Yönetim Sistemi',
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
