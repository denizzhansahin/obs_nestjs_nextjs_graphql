'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'Kayıt ID bilgisidir.',
    width: 80,
  },
  {
    field: 'enrollment_date',
    headerName: 'Kayıt Tarihi',
    description: 'Kayıt tarihi bilgisidir.',
    width: 120,
  },
  {
    field: 'status',
    headerName: 'Kayıt Durumu',
    description: 'Kayıt durumu bilgisidir.',
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    description: 'Kayıt, oluşturulma tarihi bilgisidir.',
    width: 150,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Kayıt, güncellenme tarihi bilgisidir.',
    width: 150,
  },


  {
    field: 'course',
    headerName: 'Ders Bilgisi',
    description: 'Ders kaydının sahip olduğu ders bilgisidir.',
    width: 150,
  },
  {
    field: 'students',
    headerName: 'Öğrenci',
    description: 'Dersi alan öğrenci bilgisidir.',
    width: 150,
  },
  {
    field: 'grades',
    headerName: 'Kayıt',
    description: 'Ders kaydına sahip ders bilgisidir.',
    width: 80,
  },


  {
    field: 'academician',
    headerName: 'Ders Görevlendirme',
    description: 'Öğrenci tarafından seçilen akademisyen bilgisidir.',
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
