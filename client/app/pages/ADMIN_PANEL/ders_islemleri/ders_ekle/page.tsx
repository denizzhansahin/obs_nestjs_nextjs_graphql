"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { CREATE_COURSE } from '@/app/GraphQL/DersSorgu';

export default function DersEkle() {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [credit, setCredit] = useState("")
  const [semester, setSemester] = useState("")

  const [createCourse, { loading, error, data }] = useMutation(CREATE_COURSE);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await createCourse({
        variables: {
          createdCoursesData: {
            name,
            code,
            description,
            credit: parseInt(credit),
            semester,

          },
        },
      });
      alert(`Ders oluşturuldu: ${data.createCourses.id}`);
    } catch (error) {
      console.error("Ders oluşturma hatası:", error);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="Ders adı yazınız."
          label="Ders Adı"
          required
        />
        <TextField
          fullWidth
          value={code}
          onChange={(e) => setCode(e.target.value)}
          helperText="Ders kodu numarası yazınız."
          label="Ders Kodu"
          required
        />
        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText="Ders açıklaması yazınız."
          label="Ders Açıklaması"
          required
        />
        <TextField
          fullWidth
          value={credit}
          onChange={(e) => setCredit(e.target.value)}
          helperText="Ders kredisi yazınız."
          label="Ders Kredisi"
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="role-label">Ders Dönemi</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <MenuItem value="1-1">1-1</MenuItem>
            <MenuItem value="1-2">1-2</MenuItem>
            <MenuItem value="1-3">1-3</MenuItem>
            <MenuItem value="1-4">1-4</MenuItem>
  

            <MenuItem value="2-1">2-1</MenuItem>
            <MenuItem value="2-2">2-2</MenuItem>
            <MenuItem value="2-3">2-3</MenuItem>
            <MenuItem value="2-4">2-4</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Ders Ekle"}
        </Button>
        {/* Hata Mesajı */}
        {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
        {/* Başarılı Mesaj */}
        {data && <p style={{ color: "green" }}>Ders başarıyla eklendi!</p>}
      </Box>
    </>
  );
}
