import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FIND_BY_ENROLLMENT_ID } from '@/app/GraphQL/DersKayitSorgu';
import { useMutation, useQuery } from '@apollo/client';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Button, Card, CardActionArea, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { CREATE_GRADE } from '@/app/GraphQL/NotSorgu';

interface grades {
  enrollment_id: number;
  grade_value: number;
  grade_type: string;
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
  courseInstructors: courseInstructor[];
}

interface courseInstructor {
  instructor: instructor;
  assigned_date: string;
}

interface instructor {
  userId: number;
  first_name: string;
  last_name: string;
  department: string;
}

interface academician {
  userId: number;
  first_name: string;
  last_name: string;
  department: string;
}

export default function NotEkle() {
  const [enrollment_id, setEnrollment_id] = useState("")
  const [gradesData, setGradesData] = useState<grades>()
  const [grades_type, setGrades_type] = useState("")
  const [grades_value, setGrades_value] = useState("")

  const course_enrollment = useQuery(FIND_BY_ENROLLMENT_ID, {
    variables: { id: parseFloat(enrollment_id as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });


  const [courseData_enr, setCourseData_enr] = useState<courseData | null>(null);
  const [courseAcamdecian_enr, setAcamdecian_enr] = useState<academician | null>(null);
  const [enrollment_st, setErollment_st] = useState<student[]>([])



  const handleFetchData_enrolmment = async () => {
    if (enrollment_id) {
      try {
        const { data, errors } = await course_enrollment.refetch({ id: parseFloat(enrollment_id as string) });

        if (errors) {
          console.error("GraphQL hatası:", errors);
          return;
        }

        if (data) {
          setCourseData_enr(data.findEnrollmentById?.course || null);
          setAcamdecian_enr(data.findEnrollmentById?.academician || null);
          setErollment_st(data.findEnrollmentById?.students || []);

          } 
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    }
  };


  const [createGrades, { loading, error, data }] = useMutation(CREATE_GRADE);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await createGrades({
        variables: {
          createGradeInput: {
            enrollment_id: parseInt(enrollment_id as string),
            grade_value: parseInt(grades_value as string),
            grade_type: grades_type.toString(),
          },
        },
      });
      alert(`Ders notu oluşturuldu: ${data}`);
    } catch (error) {
      console.error("Ders notu oluşturma hatası:", error);
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 3,
        }}
      >

        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >


          <TextField
            fullWidth
            type="number"
            value={enrollment_id}
            onChange={(e) => setEnrollment_id(e.target.value)}
            helperText="Not eklenecek ders kaydı ID'sini girin."
            label="Not Eklenecek Ders Kayıt ID"
            required
            sx={{ flex: 3 }}
          />
          <Button
            fullWidth
            sx={{
              height: "100%",
              fontSize: "1.25rem",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3
            }}
            variant="contained"
            color="secondary"
            onClick={handleFetchData_enrolmment}
          >
            Ders Kayıt Getir
          </Button>
        </Box>
        {/*Ders kaydına ekli öğrenci burasıdırrrrrrrrr */}
        {enrollment_st?.length > 0 ? (
          enrollment_st?.map((student, index) => (
            <Card key={index} sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
              <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Kayıt Öğrenci Adı
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {student.first_name || "Boş"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Öğrenci Soyadı
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {student.last_name || "Boş"}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          // Eğer öğrenci kaydı yoksa boş alanlar göstermek için varsayılan bir kart ekleyin
          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kayıt Öğrenci Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Boş
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Öğrenci Soyadı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Boş
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )}


        <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ders Adı
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseData_enr?.name ? courseData_enr?.name : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                Ders Kodu
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseData_enr?.code ? courseData_enr?.code : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Ders Dönemi
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseData_enr?.semester ? courseData_enr?.semester : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>


        <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Akademisyen Adı
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseAcamdecian_enr?.first_name ? courseAcamdecian_enr?.first_name : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

            <CardContent >
              <Typography gutterBottom variant="h5" component="div">
                Akademisyen Soyadı
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseAcamdecian_enr?.last_name ? courseAcamdecian_enr?.last_name : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Akademisyen Bölüm
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseAcamdecian_enr?.department ? courseAcamdecian_enr?.department : "null"}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>










        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >


          <TextField
            fullWidth
            type="number"
            value={grades_value}
            onChange={(e) => setGrades_value(e.target.value)}
            helperText="Not değeri (1-100) girin."
            label="Not Değeri"
            required
            sx={{ flex: 3 }}
          />


          <FormControl fullWidth required sx={{ flex: 3,mb:2.5 }}>
            <InputLabel id="role-label">Not Tipi</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={grades_type}
              onChange={(e) => setGrades_type(e.target.value)}
            >
              <MenuItem value="EXAM">EXAM</MenuItem>
              <MenuItem value="HOMEWORK">HOMEWORK</MenuItem>
              <MenuItem value="QUIZ">QUIZ</MenuItem>

              <MenuItem value="PROJECT">PROJECT</MenuItem>
              <MenuItem value="FINAL">FINAL</MenuItem>
            </Select>
          </FormControl>
        </Box>



        <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Ekleniyor..." : "Ders not ekleniyor"}
          </Button>
          {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
          {data && <p style={{ color: "green" }}>Ders kayıt notu eklendi!</p>}



      </Box>
    </>
  );
}
