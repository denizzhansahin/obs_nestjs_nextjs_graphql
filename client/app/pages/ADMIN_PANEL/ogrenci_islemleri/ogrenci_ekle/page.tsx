"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_STUDENT } from '@/app/GraphQL/OgrenciSorgu';
import { Button } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


export default function KullaniciEkle() {
  const [userId, setUserId] = useState<number | "">("")
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setBirth_date] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [enrollment_date, setEnrollment_date] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [status, setStatus] = useState("")


  const [createStudent, { loading, error, data }] = useMutation(CREATE_STUDENT);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    try {
      
      const { data } = await createStudent({
        variables: {
          userId: parseInt(userId), // userId'yi tam sayıya dönüştür
          first_name,
          last_name,
          email,
          phone,
          birth_date: birth_date?.toISOString(), 
          enrollment_date: enrollment_date?.toISOString(),
          status,
        }
      });
  
      alert(`Öğrenci oluşturuldu: ${data.createStudent.first_name}`);
    } catch (error) {
     alert("Öğrenci oluşturma hatası:");
    }
  };
  

  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 3,
          }}
        >
          <TextField
            fullWidth
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
            helperText="Öğrencinin kullanıcı ID bilgisi. Öğrenci ID bilgisi yazmayınız!"
            label="Kullanıcı ID(UserID)"
            required
          />
          <TextField
            fullWidth
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            helperText="Öğrenci adını yazınız."
            label="Öğrenci Adı"
            required
          />
          <TextField
            fullWidth
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            helperText="Öğrenci soyadını yazınız."
            label="Öğrenci Soyadı"
            required
          />

          <TextField
            fullWidth
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Öğrenci email bilgisini yazınız."
            label="E-Posta"
            required
          />

          <TextField
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Telefon numarası yazınız."
            label="Telefon Numarası"
            required
          />


            <DatePicker sx={{ minWidth: "100%" }}
              slotProps={{
                textField: {
                  helperText: 'Öğrencinin doğum tarihini yazınız',
                },
              }}
              onChange={(newValue) => setBirth_date(newValue)}
              value={birth_date} label="Öğrenci Doğum Tarihi" />

            <DatePicker
              slotProps={{
                textField: {
                  helperText: 'Öğrencinin kayıt tarihini yazınız',
                },
              }}
              onChange={(newValue) => setEnrollment_date(newValue)}
              sx={{ minWidth: "100%" }} value={enrollment_date} label="Öğrenci Kayıt Tarihi" />
          

          <FormControl fullWidth required>
            <InputLabel id="role-label">Öğrenci Durumu</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Active">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              <MenuItem value="GRADUATED">GRADUATED</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Ekleniyor..." : "Öğrenci Ekle"}
          </Button>
          {/* Hata Mesajı */}
          {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
          {data && <p style={{ color: "green" }}>Öğrenci başarıyla eklendi!</p>}
        </Box>
      </LocalizationProvider>
    </>
  );
}
