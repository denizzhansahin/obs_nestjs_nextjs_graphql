"use client";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/app/GraphQL/KullanıcıSorgu';
import { Button } from '@mui/material';

export default function KullaniciEdit() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const handleUpdate = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 
    try {
      const { data } = await updateUser({
        variables: {
          userId: parseFloat(userId), 
          updateUserData: {
            username: username,
            password: password,
            role: role,
          },
        },
      });
      console.log("Updated user:", data.updateUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
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
        <TextField
          fullWidth
          type="number"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          helperText="Güncellenecek kullanıcının ID'sini girin."
          label="Kullanıcı ID"
          required
        />
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
            <MenuItem value="INSTRUCTOR">INSTRUCTOR</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? "Güncelleniyor..." : "Güncelle"}
        </Button>
        
        {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
        
        {data && <p style={{ color: "green" }}>Kullanıcı başarıyla güncellendi!</p>}
      </Box>
    </>
  );
}
