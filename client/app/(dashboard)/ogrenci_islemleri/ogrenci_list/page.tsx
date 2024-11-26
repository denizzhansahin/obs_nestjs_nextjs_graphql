'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID',
    description: 'Öğrencinin, Kullanıcılar üzerindeki ID bilgisidir.',
    width: 80,
  },
  {
    field: 'first_name',
    headerName: 'Ad',
    description: 'Öğrencinin, ad bilgisidir.',
    width: 150,
  },
  {
    field: 'last_name',
    headerName: 'Soyad',
    description: 'Öğrencinin, soyad bilgisidir.',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'E-Posta',
    description: 'Öğrencinin, e-posta bilgisidir.',
    width: 150,
  },
  {
    field: 'birth_date',
    headerName: 'Doğum Tarihi',
    description: 'Öğrencinin, doğum tarihi bilgisidir.',
    width: 150,
  },

  {
    field: 'phone',
    headerName: 'Telefon',
    description: 'Öğrencinin, telefon bilgisidir.',
    width: 150,
  },
  {
    field: 'enrollment_date',
    headerName: 'Kayıt Tarihi',
    description: 'Öğrencinin, kayıt tarihi bilgisidir.',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Oluşturma Tarihi',
    description: 'Öğrencinin, sistem üzerinde oluşturulma tarihi bilgisidir.',
    width: 150,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Öğrencinin, güncellenme tarihi bilgisidir.',
    width: 150,
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
