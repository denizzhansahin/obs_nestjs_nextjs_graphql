'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { GET_ALL_GRADES } from '@/app/GraphQL/NotSorgu';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';

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



const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_GRADES);

  const rows = React.useMemo(() => {
    return (data?.getAllGrades || []).map((grade: any) => ({
      id: grade.id,
      gradeType: grade.grade_type,
      gradeValue: grade.grade_value,
      createdAt: new Date(grade.created_at).toLocaleString(),
      updatedAt: new Date(grade.updated_at).toLocaleString(),
      enrollmentId: grade.enrollments.id,
      enrollmentDate: grade.enrollments.enrollment_date,
      enrollmentStatus: grade.enrollments.status,
      courseName: grade.enrollments.course?.name || "Yok",
      studentName: grade.enrollments.students
        ? grade.enrollments.students.map((student: any) => `${student.first_name} ${student.last_name}`).join(", ")
        : "Yok",
      academicianName: grade.enrollments.academician
        ? `${grade.enrollments.academician.first_name} ${grade.enrollments.academician.last_name}`
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