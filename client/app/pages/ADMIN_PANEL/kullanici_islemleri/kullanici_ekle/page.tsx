"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

export default function KullaniciEkle() {
  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (

    <>
      <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', '& > :not(style)': { m: 2 } }}>
        <TextField fullWidth
          helperText="Burası isim veya soyad olmamalıdır. Özel olarak türetilmiş bir nickname belirleyin. Örnek olarak Denizhan Şahin için denizzhansahi gibi olabilir. Harf, numara, özel karekter kullanabilirsiniz."
          id="demo-helper-text-aligned"
          label="Kullanıcı Adı(nick name)"
        />
        <TextField fullWidth
          helperText="Buraya bir şifre yazmalısınız. Şifreniz size özel olsun, lütfen kolay olmasın."
          id="demo-helper-text-aligned-no-helper"
          label="Şifre"
        />
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Kullancı Rolü</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
            <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
            <MenuItem value={"INSTRUCTOR"}>INSTRUCTOR</MenuItem>
          </Select>
        </FormControl>
        
      </Box>
    </>
  );
}
