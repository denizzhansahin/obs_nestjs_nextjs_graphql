'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { Suspense } from 'react';
import { GET_ALL_INSTRUCTORS } from '@/app/GraphQL/AkademisyenSorgu';

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



const paginationModel = { page: 0, pageSize: 50 };

function DataTable() {
  const searchParams = useSearchParams();
  const someParam = searchParams.get('param');
  const { data, loading, error } = useQuery(GET_ALL_INSTRUCTORS);

  const rows = React.useMemo(() => {
    return (data?.getInstructors || []).map((instructor: any) => ({
      userId: instructor.userId,
      fullName: `${instructor.first_name} ${instructor.last_name}`,
      email: instructor.email,
      phone: instructor.phone,
      birthDate: new Date(instructor.birth_date).toLocaleDateString(),
      enrollmentDate: new Date(instructor.enrollment_date).toLocaleDateString(),
      department: instructor.department || "Bilinmiyor",
      createdAt: new Date(instructor.created_at).toLocaleString(),
      updatedAt: new Date(instructor.updated_at).toLocaleString(),
      username: instructor.user?.username || "Yok",
      courses: instructor.courseInstructors
        ? instructor.courseInstructors
            .map(
              (ci: any) =>
                `${ci.course.name} (${ci.course.code}, Kredisi: ${ci.course.credit})`
            )
            .join(", ")
        : "Atanan Kurs Yok",
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