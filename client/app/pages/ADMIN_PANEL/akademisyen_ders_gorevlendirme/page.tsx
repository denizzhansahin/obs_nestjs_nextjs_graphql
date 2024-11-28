"use client"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PageAkademisyenGorevlendirmeTable from './akademisyen_ders_gorevlendirme_list/page';
import AkademisyenGorevlendirmeEdit from './akademisyen_ders_gorevlendirme_edit/page';
import AkademisyenGorevlendirmeEkle from './akademisyen_ders_gorevlendirme_ekle/page';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AkademisyenGorevlendirmeIslemleriTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Akademisyen Görevlendirme Tablosu" {...a11yProps(0)} />
          <Tab label="Akademisyen Görevlendirme Ekle" {...a11yProps(1)} />
          <Tab label="Akademisyen Görevlendirme Düzenle" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PageAkademisyenGorevlendirmeTable/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AkademisyenGorevlendirmeEkle/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AkademisyenGorevlendirmeEdit/>
      </CustomTabPanel>
    </Box>
  );
}
