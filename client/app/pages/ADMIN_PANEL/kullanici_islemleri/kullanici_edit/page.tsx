"use client";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, GET_USER_BY_ID } from '@/app/GraphQL/KullanıcıSorgu';
import { Button } from '@mui/material';

export default function KullaniciEdit() {
  const [userId, setUserId] = useState("");


  const [userData, setUserData] = useState({ username: "", password: "", role: "" })

  const [username, setUsername] = useState(userData.username);
  const [password, setPassword] = useState(userData.password);
  const [role, setRole] = useState(userData.role);

  const { //data: queryData,
     refetch } = useQuery(GET_USER_BY_ID, { variables: { id: parseFloat(userId as string) }, skip: !userId, });

  const handleFetchData = async () => {
    if (userId) {
      const { data } = await refetch({ id: parseFloat(userId as string) });
      setUserData(data.getUserById);
      setUsername(data.getUserById.username); 
      setPassword(data.getUserById.password);
      setRole(data.getUserById.role);

    }

  };

  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const handleUpdate = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const { data } = await updateUser({
        variables: {
          userId: parseFloat(userId),
          updateUserData: {
            username: username ? username : userData.username,
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
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: 2,
            width:"100%",
            
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
            sx={{flex:3}}
          />
          <Button fullWidth 
          sx={{height:"100%",fontSize: "1.25rem",flex:1,display:"flex",alignItems: "center",justifyContent: "center",mb:3}}
          variant="contained" color="secondary" onClick={handleFetchData}  > Kullanıcı Verisi Getir</Button>
        </Box>
        <TextField
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          helperText="Kullanıcı adınızı belirleyin."
          label="Kullanıcı Adı (Nick Name)"

        />
        <TextField
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText="Şifre oluşturun (Güçlü ve size özel olsun)."
          label="Şifre"

        />
        <FormControl fullWidth>
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
          {loading ? "Güncelleniyor..." : "Güncelle"}
        </Button>




        {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}

        {data && <p style={{ color: "green" }}>Kullanıcı başarıyla güncellendi!</p>}
      </Box>
    </>
  );
}
