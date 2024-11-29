"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '@/app/GraphQL/KullanıcıSorgu';
import { Button } from '@mui/material';

export default function KullaniciEkle() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")


  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUser({
        variables: {
          input: {
            username,
            password,
            role,
          },
        },
      });
      alert("Kullanıcı başarıyla eklendi!");
    } catch (err) {
      console.error("Kullanıcı eklenirken hata oluştu:", err);
      alert("Kullanıcı eklenemedi!");
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Kullanıcı adınızı belirleyin."
          label="Kullanıcı Adı (Nick Name)"
          required
        />
        <TextField
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Şifre oluşturun (Güçlü ve size özel olsun)."
          label="Şifre"
          required
        />
        <FormControl fullWidth required>
          <InputLabel id="role-label">Kullanıcı Rolü</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="STUDENT">STUDENT</MenuItem>
            <MenuItem value="INSTRUCTORS">INSTRUCTORS</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Ekleniyor..." : "Kullanıcı Ekle"}
        </Button>
        {/* Hata Mesajı */}
        {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
        {/* Başarılı Mesaj */}
        {data && <p style={{ color: "green" }}>Kullanıcı başarıyla eklendi!</p>}
      </Box>
    </>
  );
}
