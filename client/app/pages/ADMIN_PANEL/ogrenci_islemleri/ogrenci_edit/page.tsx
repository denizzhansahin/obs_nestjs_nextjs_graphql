"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_STUDENT, GET_STUDENT_BY_ID } from '@/app/GraphQL/OgrenciSorgu';
import { Button } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';


export default function OgrenciEdit() {
  const [userId, setUserId] = useState("")


  
  const [studentData, setStudentData] = useState({ first_name: "", last_name: "", email: "" ,phone: "" ,birth_date: "" ,enrollment_date: "" ,status: "" })

  const [first_name, setFirst_name] = useState(studentData.first_name);
  const [last_name, setLast_name] = useState(studentData.last_name);
  const [email, setEmail] = useState(studentData.email);
  const [phone, setPhone] = useState("");
  const [birth_date, setBirth_date] = useState<Dayjs | null>(null);
  const [enrollment_date, setEnrollment_date] = useState<Dayjs | null>(null);
  const [status, setStatus] = useState("")

  const { //data: queryData,
     refetch } = useQuery(GET_STUDENT_BY_ID, { variables: { id: parseFloat(userId as string) }, 
  skip: true, // Başlangıçta sorguyu atla 
  });

  const [updateStudent, { loading, error, data }] = useMutation(UPDATE_STUDENT);


  
  const handleFetchData = async () => {
    if (userId) {
      const { data } = await refetch({ id: parseFloat(userId as string) });
      setStudentData(data.getStudentById);
      setFirst_name(data.getStudentById.first_name);
      setLast_name(data.getStudentById.last_name);
      setEmail(data.getStudentById.email);
      setPhone(data.getStudentById.phone);
      setBirth_date(dayjs(data.getStudentById.birth_date));
      setEnrollment_date(dayjs(data.getStudentById.enrollment_date));
      setStatus(data.getStudentById.status);
    }
  };


  const handleUpdate = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const { data } = await updateStudent({
        variables: {
          userId: parseFloat(userId as string),
          updateStudentData: {
            first_name: first_name ? first_name : studentData.first_name,
            last_name: last_name ? last_name : studentData.last_name,
            email: email ? email : studentData.email,
            phone: phone ? phone : studentData.phone,
            birth_date: birth_date ? birth_date.toISOString() : studentData.birth_date,
            enrollment_date: enrollment_date ? enrollment_date.toISOString() : studentData.enrollment_date,
            status: status ? status : studentData.status,
          },
        },
      });
      console.log("Öğrenci güncelleme yapıldı:", data.updateStudent);
    } catch (error) {
      console.error("Hata öğrenci güncelleme:", error);
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
            helperText="Güncellenecek öğrencinin kullanıcı ID'sini girin."
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
            Öğrenci Verisi Getir
          </Button>
        </Box>
          <TextField
            fullWidth
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            helperText="Öğrenci adını yazınız."
            label="Öğrenci Adı"
            
          />
          <TextField
            fullWidth
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
            helperText="Öğrenci soyadını yazınız."
            label="Öğrenci Soyadı"
            
          />

          <TextField
            fullWidth
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            helperText="Öğrenci email bilgisini yazınız."
            label="E-Posta"
            
          />

          <TextField
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            helperText="Telefon numarası yazınız."
            label="Telefon Numarası"
            
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
          

          <FormControl fullWidth>
            <InputLabel id="role-label">Öğrenci Durumu</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
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
