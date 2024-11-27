'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'İlgili notun ID bilgisidir.',
    width: 100,
  },
  {
    field: 'grade_type',
    headerName: 'Not Tipi',
    description: 'Notun sahip olduğu bilgisidir.',
    width: 150,
  },
  {
    field: 'grade_value',
    headerName: 'Not Değeri',
    description: 'Notun değer(0-100) bilgisidir.',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    description: 'Notun oluşturulması ile ilgili tarih bilgisidir.',
    width: 250,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Notun güncellenmesi ile ilgili tarih bilgisidir.',
    width: 250,
  },
  {
    field: 'enrollments',
    headerName: 'Ders Kayıt Bilgisi',
    description: 'Notun sahip olduğu ders kayıtlanma bilgisidir.',
    width: 250,
  }

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
