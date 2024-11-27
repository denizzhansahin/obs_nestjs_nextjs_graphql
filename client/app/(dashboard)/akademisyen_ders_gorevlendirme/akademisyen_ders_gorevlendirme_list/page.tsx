'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';
import { GET_ALL_COURSE_INSTRUCTORS } from '@/app/GraphQL/AkademisyenDersGorevlendirmeSorgu';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'Akademisyenin ders görevlendirmesi ID bilgisidir.',
    width: 100,
  },
  {
    field: 'course',
    headerName: 'Dersler',
    description: 'Akademisyenin ders görevlendirilmesi kapsamındaki bilgisidir.',
    width: 150,
  },
  {
    field: 'instructor',
    headerName: 'Görevli Akademisyen',
    description: 'Görevlendirilmiş akademisyen bilgisidir.',
    width: 250,
  },
  {
    field: 'assigned_date',
    headerName: 'Görevlendirme Tarihi',
    description: 'Akademisyenin görevlendirilme tarih bilgisidir.',
    width: 250,
  }
];

const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_COURSE_INSTRUCTORS);

  const rows = React.useMemo(() => {
    return (data?.getAllCourseInstructors || []).map((courseInstructor: any) => ({
      id: courseInstructor.id,
      course: `${courseInstructor.course?.name || "Bilinmiyor"} (${courseInstructor.course?.code || "Bilinmiyor"})`,  // Ders adı ve kodu
      instructor: `${courseInstructor.instructor?.first_name || "Bilinmiyor"} ${courseInstructor.instructor?.last_name || "Bilinmiyor"}`, // Akademisyenin adı
      assigned_date: new Date(courseInstructor.assigned_date).toLocaleDateString('tr-TR'),  // Görevlendirme tarihi
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
    <Paper sx={{ height: 800, width: '100%' }}>
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
