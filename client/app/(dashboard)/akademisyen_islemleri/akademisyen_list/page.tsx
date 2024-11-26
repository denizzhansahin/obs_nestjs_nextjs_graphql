'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  {
    field: 'userId',
    headerName: 'ID',
    description: 'Akademisyenin kullanıcı ID bilgisidir.',
    width: 100,
  },
  {
    field: 'first_name',
    headerName: 'Ad',
    description: 'Akademisyenin ad bilgisidir.',
    width: 150,
  },
  {
    field: 'last_name',
    headerName: 'Soyad',
    description: 'Akademisyen bilgisidir.',
    width: 150,
  },
  {
    field: 'phone',
    headerName: 'Telefon',
    description: 'Akademisyen telefon bilgisidir.',
    width: 150,
  },

  {
    field: 'department',
    headerName: 'Departman',
    description: 'Akademisyenin bağlı olduğu bölüm bilgisidir.',
    width: 200,
  },


  {
    field: 'birth_date',
    headerName: 'Doğum Tarihi',
    description: 'Akademisyen doğum tarihi bilgisidir.',
    width: 200,
  },
  {
    field: 'enrollment_date',
    headerName: 'Kayıt Tarihi',
    description: 'Akademisyen kayıt tarihi bilgisidir.',
    width: 200,
  },
  
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    description: 'Akademisyen, oluşturulma tarihi bilgisidir.',
    width: 200,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Akademisyen, güncellenme tarihi bilgisidir.',
    width: 200,
  },

  {
    field: 'courseInstructors',
    headerName: 'Ders Görevlendirme',
    description: 'Akademisyenin görevlendirme bilgisidir.',
    width: 200,
  },
  {
    field: 'enrollments',
    headerName: 'Ders Kayıt Bilgisi',
    description: 'Akademisyenin, öğrenciler tarafından seçildiği ders kayıtları bilgisidir.',
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
