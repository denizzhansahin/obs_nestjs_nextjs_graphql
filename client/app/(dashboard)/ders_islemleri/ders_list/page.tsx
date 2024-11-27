'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';
import { GET_ALL_LESSON } from '@/app/GraphQL/DersSorgu';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'Ders ID bilgisidir.',
    width: 100,
  },
  {
    field: 'name',
    headerName: 'Ders Adı',
    description: 'Ders adı bilgisidir.',
    width: 150,
  },
  {
    field: 'code',
    headerName: 'Ders Kodu',
    description: 'Ders kodu bilgisidir.',
    width: 100,
  },
  {
    field: 'description',
    headerName: 'Açıklama',
    description: 'Ders açıklama bilgisidir.',
    width: 200,
  },
  {
    field: 'credit',
    headerName: 'Kredi',
    description: 'Ders kredi bilgisidir.',
    width: 100,
  },
  {
    field: 'semester',
    headerName: 'Dönem',
    description: 'Ders dönem bilgisidir.',
    width: 100,
  },
  {
    field: 'created_at',
    headerName: 'Oluşturulma Tarihi',
    description: 'Ders, oluşturulma tarihi bilgisidir.',
    width: 200,
  },
  {
    field: 'updated_at',
    headerName: 'Güncellenme Tarihi',
    description: 'Ders, güncellenme tarihi bilgisidir.',
    width: 200,
  },

  {
    field: 'courseInstructors',
    headerName: 'Ders Görevlendirme',
    description: 'Dersin, akademisyenlere görevlendirme bilgisidir.',
    width: 200,
  },
  {
    field: 'enrollments',
    headerName: 'Ders Kayıt Bilgisi',
    description: 'Dersin, öğrenciler tarafından oluşturulduğu ders kayıtları bilgisidir.',
    width: 200,
  },

];


const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_LESSON);

  const rows = React.useMemo(() => {
    return (data?.getEnrollments || []).map((enrollment: any) => ({
      id: enrollment.id,
      enrollmentDate: enrollment.enrollment_date,
      status: enrollment.status,
      createdAt: new Date(enrollment.created_at).toLocaleString(),
      updatedAt: new Date(enrollment.updated_at).toLocaleString(),
      courseName: enrollment.course?.name || "Yok",
      academicianName: enrollment.academician
        ? `${enrollment.academician.first_name} (User ID: ${enrollment.academician.userId})`
        : "Yok",
      studentName: enrollment.students
        ? enrollment.students.map((student: any) => `${student.first_name} (User ID: ${student.userId})`).join(", ")
        : "Yok",
      courseInstructors: enrollment.course?.courseInstructors
        ? enrollment.course.courseInstructors
            .map((ci: any) => `${ci.instructor.first_name} (User ID: ${ci.instructor.userId})`)
            .join(", ")
        : "Yok",
      grades: enrollment.grades
        ? enrollment.grades.map((grade: any) => `${grade.grade_type}: ${grade.grade_value}`).join(", ")
        : "Yok",
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