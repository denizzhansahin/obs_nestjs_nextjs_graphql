"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_INSTRUCTORS, GET_INSTRUCTORS_BY_ID } from '@/app/GraphQL/AkademisyenSorgu';
import { Button } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';


export default function AkademisyenEdit() {
  const [userId, setUserId] = useState("")



  const [akademisyenData, setAkademisyenData] = useState({ first_name: "", last_name: "", email: "", phone: "", birth_date: "", enrollment_date: "", department: "" })

  const [first_name, setFirst_name] = useState(akademisyenData.first_name);
  const [last_name, setLast_name] = useState(akademisyenData.last_name);
  const [email, setEmail] = useState(akademisyenData.email);
  const [phone, setPhone] = useState(akademisyenData.phone);
  const [birth_date, setBirth_date] = useState<Dayjs | null>(null);
  const [enrollment_date, setEnrollment_date] = useState<Dayjs | null>(null);
  const [department, setDepartment] = useState(akademisyenData.department);


  const { //data: queryData,
    refetch } = useQuery(GET_INSTRUCTORS_BY_ID, {
      variables: { id: parseFloat(userId as string) },
      skip: true, // Başlangıçta sorguyu atla 
    });

  const [updateAkademisyen, { loading, error, data }] = useMutation(UPDATE_INSTRUCTORS);



  const handleFetchData = async () => {
    if (userId) {
      const { data } = await refetch({ id: parseFloat(userId as string) });
      setAkademisyenData(data.getInstructorById);
      setFirst_name(data.getInstructorById.first_name);
      setLast_name(data.getInstructorById.last_name);
      setEmail(data.getInstructorById.email);
      setPhone(data.getInstructorById.phone);
      setBirth_date(dayjs(data.getInstructorById.birth_date));
      setEnrollment_date(dayjs(data.getInstructorById.enrollment_date));
      setDepartment(data.getInstructorById.department)
    }
  };


  const handleUpdate = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const { data } = await updateAkademisyen({
        variables: {
          userId: parseFloat(userId as string),
          updateInstructorData: {
            first_name: first_name ? first_name : akademisyenData.first_name,
            last_name: last_name ? last_name : akademisyenData.last_name,
            email: email ? email : akademisyenData.email,
            phone: phone ? phone : akademisyenData.phone,
            birth_date: birth_date ? birth_date.toISOString() : akademisyenData.birth_date,
            enrollment_date: enrollment_date ? enrollment_date.toISOString() : akademisyenData.enrollment_date,
            department: department ? department : akademisyenData.department
          },
        },
      });
      console.log("Akademisyen güncelleme yapıldı:", data.updateInstructorData.first_name);
    } catch (error) {
      console.error("Akademisyen güncelleme hata:", error);
    }
  };
  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 3,
          }}
        >
          <Box
            sx={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              helperText="Güncellenecek akademisyenin kullanıcı ID'sini girin."
              label="Kullanıcı ID"
              required
              sx={{ flex: 3 }}
            />
            <Button
              fullWidth
              sx={{
                height: "100%",
                fontSize: "1.25rem",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 3
              }}
              variant="contained"
              color="secondary"
              onClick={handleFetchData}
            >
              Akademisyen Verisi Getir
            </Button>
          </Box>
          <TextField
            fullWidth
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            helperText="Akademisyen adını yazınız."
            label="Akademisyen Adı"

          />
          <TextField
            fullWidth
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            helperText="Akademisyen soyadını yazınız."
            label="Akademisyen Soyadı"

          />

          <TextField
            fullWidth
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Akademisyen email bilgisini yazınız."
            label="E-Posta"

          />

          <TextField
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Telefon numarası yazınız."
            label="Telefon Numarası"

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
            {loading ? "Güncelleniyor..." : "Akademisyen Güncelle"}
          </Button>
          {/* Hata Mesajı */}
          {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
          {data && <p style={{ color: "green" }}>Akademisyen başarıyla eklendi!</p>}
        </Box>
      </LocalizationProvider>
    </>
  );
}
