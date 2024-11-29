

"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';
import { CREATE_INSTRUCTORS } from '@/app/GraphQL/AkademisyenSorgu';


export default function AkademisyenEkle() {
  const [userId, setUserId] = useState("")
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth_date, setBirth_date] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [enrollment_date, setEnrollment_date] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [department, setDepartment] = useState("");

  const [createInstructor, { loading, error, data }] = useMutation(CREATE_INSTRUCTORS);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await createInstructor({
        variables: {
          createdInstructorsData: {
            userId: parseFloat(userId as string),
            first_name,
            last_name,
            email,
            phone,
            department,
            birth_date: birth_date ? birth_date.toISOString() : null,
            enrollment_date: enrollment_date ? enrollment_date.toISOString() : null,
          },
        },
      });
      alert(`Akademisyen oluşturuldu: ${data.createInstructors.first_name}`);
    } catch (error) {
      console.error("Akademisyen oluşturma hatası:", error);
    }
  };


  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <>
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
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              helperText="Akademisyenin kullanıcı ID'sini girin."
              label="Kullanıcı ID"
              required
            />
            <TextField
              fullWidth
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              helperText="Akademisyenin adını belirleyin."
              label="Adı"
              required
            />
            <TextField
              fullWidth
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              helperText="Akademisyenin soyadını belirleyin."
              label="Soyadı"
              required
            />
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              helperText="Akademisyenin email adresini yazın."
              label="Email"
              required
            />
            <TextField
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              helperText="Akademisyenin telefon numarasını yazın."
              label="Telefon Numarası"
              required
            />
            <TextField
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              helperText="Akademisyenin bölümünü yazın."
              label="Bölüm"
              required
            />

            <DatePicker sx={{ minWidth: "100%" }}
              slotProps={{
                textField: {
                  helperText: 'Akademisyen doğum tarihini yazınız',
                },
              }}
              onChange={(newValue) => setBirth_date(newValue)}
              value={birth_date} label="Akademisyen Doğum Tarihi" />

            <DatePicker
              slotProps={{
                textField: {
                  helperText: 'Akademisyen kayıt tarihini yazınız',
                },
              }}
              onChange={(newValue) => setEnrollment_date(newValue)}
              sx={{ minWidth: "100%" }} value={enrollment_date} label="Akademisyen Kayıt Tarihi" />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Oluşturuluyor..." : "Akademisyeni Oluştur"}
            </Button>
            {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
            {data && <p style={{ color: "green" }}>Akademisyen başarıyla oluşturuldu!</p>}
          </Box>
        </>
      </LocalizationProvider>
    </>
  );
}
