"use client"

import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { FIND_BY_ENROLLMENT_ID } from '@/app/GraphQL/DersKayitSorgu';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Card, CardActionArea, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { UPDATE_GRADE } from '@/app/GraphQL/NotSorgu';

interface grades {
  id: number;
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

export default function NotEdit() {
  const [enrollment_id, setEnrollment_id] = useState("")
  //const [gradesData, setGradesData] = useState<grades>()

  const [gradeId, setGradeId] = useState("")

  const course_enrollment = useQuery(FIND_BY_ENROLLMENT_ID, {
    variables: { id: parseFloat(enrollment_id as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });


  const [courseData_enr, setCourseData_enr] = useState<courseData | null>(null);
  const [courseAcamdecian_enr, setAcamdecian_enr] = useState<academician | null>(null);
  const [enrollment_st, setErollment_st] = useState<student[]>([])
  const [enrollment_st_grades, setErollment_st_grades] = useState<grades[]>([])



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
          setErollment_st_grades(data.findEnrollmentById?.grades || [])

        }
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
      }
    }
  };




  //const [gradeByData, setGradeByData] = useState<grades | null>(null);




  //const [gradeId, setGradeId] = useState("");
  const [gradeValue, setGradeValue] = useState("");
  const [gradeType, setGradeType] = useState("");
  const [updateGrade] = useMutation(UPDATE_GRADE);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      await updateGrade({
        variables: {
          gradeId: parseFloat(gradeId),
          gradeValue: parseFloat(gradeValue),
          gradeType: gradeType || null,
        },
      });
      alert("Grade updated successfully!");
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the grade.");
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

        {enrollment_st_grades && enrollment_st_grades.length > 0 && (
          <Card sx={{ marginTop: 2, width: "100%" }}>
            <h3>Ders Notları</h3>
            <Grid container spacing={2}>
              {enrollment_st_grades.map((grades, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>

                  <CardContent>
                    <Typography variant="h6" component="div">
                      Ders Notu: {grades?.grade_value ?? 'Bilgi yok'}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Not Tipi: {grades?.grade_type ?? 'Bilgi yok'}
                    </Typography>
                    <Typography variant="body2">
                      ID: {grades?.id ?? 'Bilgi yok'}
                    </Typography>
                  </CardContent>

                </Grid>
              ))}
            </Grid>
          </Card>
        )}





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
            value={gradeId}
            onChange={(e) => setGradeId(e.target.value)}
            helperText="Not ile ilgili ID yazınız."
            label="Not ID"
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
            //onClick={handleFetchData_grade}
          >
            Ders Notu Getir
          </Button>
        </Box>







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
            value={gradeValue}
            onChange={(e) => setGradeValue(e.target.value)}
            helperText="Not değeri (1-100) girin."
            label="Not Değeri"
            sx={{ flex: 3 }}
          />


          <FormControl fullWidth sx={{ flex: 3, mb: 2.5 }}>
            <InputLabel id="role-label">Not Tipi</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={gradeType}
              onChange={(e) => setGradeType(e.target.value)}
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
          //disabled={loading}
        >
          Güncelle
        </Button>
      



      </Box>
    </>
  );
}
