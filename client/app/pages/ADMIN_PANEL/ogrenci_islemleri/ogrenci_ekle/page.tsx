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




export default function KullaniciEkle() {
  const [userId, setUserId] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoone] = useState("");
  const [birth_date,setBirth_date] = useState("")
  const [enrollment_date,setEnrollment_date]= useState("")
  const [status,setStatus] = useState("")


  const [createStudent, { loading, error, data }] = useMutation(CREATE_STUDENT);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 
    try {
      const { data } = await createStudent({
        variables: {
          userId: parseFloat(userId), 
          updateUserData: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone:phone,
            birth_date:birth_date,
            enrollment_date:enrollment_date,
            status:status
          },
        },
      });
      console.log("Öğrenci oluşturuldu:", data.updateUser);
    } catch (error) {
      console.error("Öğrenci oluşturma hata:", error);
    }
  };

  return (

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
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
          onChange={(e) => setPhoone(e.target.value)}
          helperText="Telefon numarası yazınız."
          label="Telefon Numarası"
          required
        />



<TextField
          fullWidth
          value={birth_date}
          onChange={(e) => setBirth_date(e.target.value)}
          helperText="Öğrenci doğum tarihini yazınız."
          label="Öğrenci Doğum Tarihi"
          required
        />

<TextField
          fullWidth
          value={enrollment_date}
          onChange={(e) => setEnrollment_date(e.target.value)}
          helperText="Öğrenci kayıt yazınız."
          label="Öğrenci Kayıt Tarihi"
          required
        />


        <FormControl fullWidth required>
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
        {/* Başarılı Mesaj */}
        {data && <p style={{ color: "green" }}>Öğrenci başarıyla eklendi!</p>}
      </Box>
    </>
  );
}
