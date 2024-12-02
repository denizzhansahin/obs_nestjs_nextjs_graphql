'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';
import { GET_ALL_LESSON } from '@/app/GraphQL/DersSorgu';

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  credit: number;
  semester: string;
  created_at: string;
  updated_at: string;
  courseInstructors: CourseInstructor[];
  enrollments: Enrollment[];
}

interface Enrollment {
  userId: string;
  first_name: string;
}

interface CourseInstructor {
  id: string;
  instructor: Instructor;
}
//instructor {userId first_name}

interface Instructor{
  userId:string,
  first_name:string,
}
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


];


const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const { data, loading, error } = useQuery(GET_ALL_LESSON);

  const rows = React.useMemo(() => {
    if (data && data.getCourses) {
      return data.getCourses.map((course: Course) => ({
        id: course.id,
        name: course.name,
        code: course.code,
        description: course.description,
        credit: course.credit,
        semester: course.semester,
        created_at: new Date(course.created_at).toLocaleString(),
        updated_at: new Date(course.updated_at).toLocaleString(),
        courseInstructors: course.courseInstructors && course.courseInstructors.length > 0
        ? course.courseInstructors
            .map((courseInstructor) => {
              // Eğer instructor yoksa "Bilinmiyor" yazıyoruz
              const instructorName = courseInstructor.instructor && courseInstructor.instructor.first_name
                ? `${courseInstructor.instructor.first_name} (ID: ${courseInstructor.instructor.userId})`
                : "Bilinmiyor";
              return instructorName;
            })
            .join(', ')
        : "Eğitmen atanmadı", // Eğer courseInstructors null ya da boşsa, "Eğitmen atanmadı" yazıyoruz
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


export default function PageDersTabs() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataTable />
    </Suspense>
  );
}