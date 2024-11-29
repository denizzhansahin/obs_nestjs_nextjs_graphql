"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { GET_COURSE_BY_ID, UPDATE_COURSE } from '@/app/GraphQL/DersSorgu';

export default function DersEdit() {
  const [courseId, setCourseId] = useState("")
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [credit, setCredit] = useState("")
  const [semester, setSemester] = useState("")


  


  const course_query_by_id = useQuery(GET_COURSE_BY_ID, {
    variables: { id: parseFloat(courseId as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });

  const handleFetchData_course = async () => {
    if (courseId) {
      const { data } = await course_query_by_id.refetch({ id: parseFloat(courseId as string) });
      setName(data.findCourseById.name);
      setCode(data.findCourseById.code);
      setDescription(data.findCourseById.description);
      setCredit(data.findCourseById.credit);
      setSemester(data.findCourseById.semester);
    }
  };

  const [updateCourse, { loading, error, data }] = useMutation(UPDATE_COURSE);


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await updateCourse({
        variables: {
          id: parseInt(courseId),
          updateCourseData: {
            name,
            code,
            description,
            credit: parseInt(credit),
            semester,

          },
        },
      });
      alert(`Ders güncellendi: ${data}`);
    } catch (error) {
      console.error("Ders güncelleme hatası:", error);
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
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            helperText="Ders ID bilgisi yazınız."
            label="Ders ID"
            sx={{ flex: 3 }}
            required
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
            onClick={handleFetchData_course}
          >
            Ders Verisi Getir
          </Button>
        </Box>

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
          {loading ? "Güncelleniyor..." : "Ders Güncelle"}
        </Button>
        {/* Hata Mesajı */}
        {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
        {/* Başarılı Mesaj */}
        {data && <p style={{ color: "green" }}>Ders başarıyla güncellendi!</p>}
      </Box>
    </>
  );
}
