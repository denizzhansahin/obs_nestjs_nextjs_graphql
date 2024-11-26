'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID(UserID)',
    description: 'Kullanıcı ID bilgisidir.',
    width: 100,
  },
  {
    field: 'username',
    headerName: 'Kullanıcı Adı',
    description: 'Kullanıcı sistem adı bilgisidir.',
    width: 150,
  },
  {
    field: 'password',
    headerName: 'Şifre',
    description: 'Kullanıcı şifre bilgisidir.',
    width: 100,
  },
  {
    field: 'role',
    headerName: 'Rol',
    description: 'Kullanıcı rol bilgisidir.',
    width: 100,
  },

  {
    field: 'created_at',
    headerName: 'Oluşturma Tarihi',
    description: 'Kullanıcı, sistem üzerinde oluşturulma tarihi bilgisidir.',
    width: 200,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Kullanıcı, güncellenme tarihi bilgisidir.',
    width: 200,
  },

  {
    field: 'student',
    headerName: 'Öğrencilik Bilgisi',
    description: 'Kullanıcının sistem üzerindeki öğrencilik bilgisidir.',
    width: 200,
  },
  {
    field: 'instructors',
    headerName: 'Akademisyenlik Bilgisi',
    description: 'Kullanıcının sistem üzerindeki akademisyenlik bilgisidir.',
    width: 200,
  },

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 50 };

export default function DataTable() {
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
