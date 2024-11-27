'use client';

import { Suspense } from 'react';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '@/app/GraphQL/KullanıcıSorgu';

interface Student {
  first_name: string;
  userId: string;
}

interface Instructor {
  first_name: string;
  userId: string;
}

interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
  student: Student | null;
  instructors: Instructor | null;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID(UserID)", width: 100 },
  { field: "username", headerName: "Kullanıcı Adı", width: 150 },
  { field: "password", headerName: "Şifre", width: 100 },
  { field: "role", headerName: "Rol", width: 100 },
  { field: "created_at", headerName: "Oluşturma Tarihi", width: 200 },
  { field: "updated_at", headerName: "Güncellenme Tarihi", width: 200 },
  { field: "student", headerName: "Öğrencilik Bilgisi", width: 200 },
  { field: "instructors", headerName: "Akademisyenlik Bilgisi", width: 200 },
];

const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {

  const { data, loading, error } = useQuery<{ getUsers: User[] }>(GET_ALL_USERS); // Define expected response shape

  const rows = React.useMemo(() => {
    if (data && data.getUsers) {
      return data.getUsers.map((user) => ({
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        created_at: new Date(user.created_at).toLocaleString(),
        updated_at: new Date(user.updated_at).toLocaleString(),
        student: user.student
          ? `${user.student.first_name} (ID: ${user.student.userId})`
          : "Yok",
        instructors: user.instructors
          ? `${user.instructors.first_name} (ID: ${user.instructors.userId})`
          : "Yok",
      }));
    }
    return [];
  }, [data]);

  if (error) {
    return <div><p>Veriler yüklenirken bir hata oluştu: {error.message}</p></div>;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Veriler yükleniyor...</p>
      </div>
    );
  }

  return (
    <Paper sx={{ height: 800 , width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable />
    </Suspense>
  );
}
