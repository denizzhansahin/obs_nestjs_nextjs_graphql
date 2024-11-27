'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { useQuery } from '@apollo/client';
import { GET_ALL_STUDENT } from '@/app/GraphQL/OgrenciSorgu';

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
    field: 'phone',
    headerName: 'Telefon',
    description: 'Öğrencinin, telefon bilgisidir.',
    width: 150,
  },
  {
    field: 'birth_date',
    headerName: 'Doğum Tarihi',
    description: 'Öğrencinin, doğum tarihi bilgisidir.',
    width: 150,
  },


  {
    field: 'enrollment_date',
    headerName: 'Kayıt Tarihi',
    description: 'Öğrencinin, kayıt tarihi bilgisidir.',
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Durum',
    description: 'Öğrencinin, aktiflik durumu bilgisidir.',
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



const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_STUDENT);

  const rows = React.useMemo(() => {
    return (data?.getStudents || []).map((student: any) => ({
      id:student.userId,
      userId: student.userId,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone,
      birth_date: student.birth_date,
      enrollment_date: student.enrollment_date,
      status: student.status,
      created_at: new Date(student.created_at).toLocaleString(),
      updated_at: new Date(student.updated_at).toLocaleString(),
      username: student.user?.username || "Yok",
    }));
  }, [data]);


  if (error) {
    return (
      <div>
        <p>Veriler yüklenirken bir hata oluştu: {error.message}</p>
      </div>
    );
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