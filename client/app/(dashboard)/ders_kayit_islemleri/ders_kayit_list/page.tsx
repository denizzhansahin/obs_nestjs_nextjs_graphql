'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { GET_ALL_ENROLLMENT } from '@/app/GraphQL/DersKayitSorgu';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';

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
    headerName: 'Akademisyen Görevlendirme',
    description: 'Öğrenci tarafından seçilen akademisyen bilgisidir.',
    width: 150,
  },


];



const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_ENROLLMENT);

  const rows = React.useMemo(() => {
    if (data && data.getEnrollments) {
      return data.getEnrollments.map((enrollment: any) => ({
        id: enrollment.id,
        enrollment_date: new Date(enrollment.enrollment_date).toLocaleString(),
        status: enrollment.status,
        created_at: new Date(enrollment.created_at).toLocaleString(),
        updated_at: new Date(enrollment.updated_at).toLocaleString(),
        course: enrollment.course
          ? `${enrollment.course.name} (Code: ${enrollment.course.code})`
          : "Yok",
        students: enrollment.students
          ? enrollment.students.map((student: any) => `${student.first_name} (ID: ${student.userId})`).join(', ')
          : "Yok",
        grades: enrollment.grades || "Yok",
        academician: enrollment.academician
          ? `${enrollment.academician.first_name} (ID: ${enrollment.academician.userId})`
          : "Yok",
      }));
    }
    return [];
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