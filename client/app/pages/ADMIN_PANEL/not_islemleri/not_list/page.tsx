'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { GET_ALL_GRADES } from '@/app/GraphQL/NotSorgu';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';

interface Grade {
  enrollments: any;
  id: string;
  grade_type: string;
  grade_value: number;
  created_at: string;
  updated_at: string;
}

interface student {
  userId: number;
  first_name: string;
  last_name: string;
  email: string
}


interface courseData {
  id: number;
  name: string;
  code: string;
  semester: string;
}


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
    description: 'Notun sahip olduğu tip bilgisidir.',
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
    field: 'student_info',
    headerName: 'Öğrenci ID',
    description: 'Notun öğrenci bilgisidir.',
    width: 250,
  },
  {
    field: 'student_name_info',
    headerName: 'Öğrenci Bilgisi',
    description: 'Notun ders kayıt bilgisidir.',
    width: 250,
  },
];

const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const { data, loading, error } = useQuery<{ getAllGrades: Grade[] }>(GET_ALL_GRADES);

  const rows = React.useMemo(() => {
    if (data && data.getAllGrades) {
      return data.getAllGrades.map((grade) => ({
        id: grade.id,
        grade_type: grade.grade_type,
        grade_value: grade.grade_value,
        created_at: new Date(grade.created_at).toLocaleString(),
        updated_at: new Date(grade.updated_at).toLocaleString(),
        student_info: grade.enrollments? grade.enrollments.students[0].userId : "null",
        student_name_info: grade.enrollments? `${grade.enrollments.students[0].first_name}   ${grade.enrollments.students[0].last_name}` : "null"
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

export default function PageNotTable() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable />
    </Suspense>
  );
}
