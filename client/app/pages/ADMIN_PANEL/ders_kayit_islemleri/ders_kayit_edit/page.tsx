"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_INSTRUCTORS_BY_ID } from '@/app/GraphQL/AkademisyenSorgu';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { GET_COURSE_BY_ID } from '@/app/GraphQL/DersSorgu';
import { GET_STUDENT_BY_ID } from '@/app/GraphQL/OgrenciSorgu';
import { FIND_BY_ENROLLMENT_ID, UPDATE_ENROLLMENT} from '@/app/GraphQL/DersKayitSorgu';
import Grid from '@mui/material/Grid';



interface instructor {
  userId: number;
  first_name: string;
  last_name: string;
  department: string;
}

interface courseInstructor {
  instructor: instructor;
  assigned_date: string;
}

interface courseData {
  id: number;
  name: string;
  code: string;
  semester: string;
  courseInstructors: courseInstructor[];
}

export default function DersKayitEdit() {
  const [enrollmentId, setEnrollmentId] = useState("")


  const [userId, setUserId] = useState("")
  const [akademisyenData, setAkademisyenData] = useState({ first_name: "", last_name: "", email: "", phone: "", birth_date: "", enrollment_date: "", department: "" })

  const [first_name, setFirst_name] = useState(akademisyenData.first_name);
  const [last_name, setLast_name] = useState(akademisyenData.last_name);
  const [department, setDepartment] = useState(akademisyenData.department);


  const { //data: queryData,
    refetch } = useQuery(GET_INSTRUCTORS_BY_ID, {
      variables: { id: parseFloat(userId as string) },
      skip: true, // Başlangıçta sorguyu atla 
    });




  const handleFetchData = async () => {
    if (userId) {
      const { data } = await refetch({ id: parseFloat(userId as string) });
      setAkademisyenData(data.getInstructorById);
      setFirst_name(data.getInstructorById.first_name);
      setLast_name(data.getInstructorById.last_name);
      setDepartment(data.getInstructorById.department)
    }
  };


  const [courseId, setCourseId] = useState("")
  const [courseData, setCourseData] = useState<courseData | null>(null);
  const [courseInstructors, setCourseInstructor] = useState<courseInstructor[]>([]);
  const [name, setName] = useState(courseData?.name)
  const [code, setCode] = useState(courseData?.code)
  const [semester, setSemester] = useState(courseData?.semester)



  const course_query = useQuery(GET_COURSE_BY_ID, {
    variables: { id: parseFloat(courseId as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });


  const handleFetchData_course = async () => {
    if (courseId) {
      const { data } = await course_query.refetch({ id: parseFloat(courseId as string) });
      setCourseData(data.findCourseById);
      setName(data.findCourseById.name);
      setCode(data.findCourseById.code);
      setSemester(data.findCourseById.semester)
      setCourseInstructor(data.findCourseById.courseInstructors)
    }
  };



  const [userId_st, setUserId_st] = useState("")
  const [first_name_st, setFirst_name_st] = useState("");
  const [last_name_st, setLast_name_st] = useState("");
  const queryStudent = useQuery(GET_STUDENT_BY_ID, {
    variables: { id: parseFloat(userId_st as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });





  const handleFetchData_student = async () => {
    if (userId_st) {
      const { data } = await queryStudent.refetch({ id: parseFloat(userId_st as string) });
      setFirst_name_st(data.getStudentById.first_name);
      setLast_name_st(data.getStudentById.last_name);

    }
  };




  const [enrollment_date, setEnrollmentDate] = useState<Dayjs | null>(dayjs('2022-04-17'))
  const [status, setStatus] = useState("")


  const course_enrollment = useQuery(FIND_BY_ENROLLMENT_ID, {
    variables: { id: parseFloat(enrollmentId as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });


  const [courseData_enr, setCourseData_enr] = useState<courseData | null>(null);
  const [courseInstructors_enr, setCourseInstructor_enr] = useState<courseInstructor[]>([]);

  

  const handleFetchData_enrolmment = async () => {
    if (enrollmentId) {
      const { data } = await course_enrollment.refetch({ id: parseFloat(enrollmentId as string) });
      setCourseData_enr(data.findEnrollmentById.course);
      setLast_name_st(data.findEnrollmentById.students.last_name);

    }
  };



  const [updateEnrollment, { loading, error, data }] = useMutation(UPDATE_ENROLLMENT);

  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          component="form"
          //onSubmit={handleSubmit}
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
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              helperText="Ders kaydı ID'sini girin."
              label="Ders Kayıt ID"
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
          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Öğrenci Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {first_name_st ? first_name_st : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Öğrenci Soyadı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {last_name_st ? last_name_st : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>

          </Card>

          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ders Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {name ? name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Ders Kodu
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {code ? code : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ders Dönemi
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {semester ? semester : "null"}
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
                  {first_name ? first_name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Akademisyen Soyadı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {last_name ? last_name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Akademisyen Bölüm
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {department ? department : "null"}
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
              value={userId_st}
              onChange={(e) => setUserId_st(e.target.value)}
              helperText="Ders kaydı yapılacak öğrencinin kullanıcı ID'sini girin."
              label="Öğrenci Kullanıcı ID"
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
              onClick={handleFetchData_student}
            >
              Öğrenci Verisi Getir
            </Button>
          </Box>



          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Öğrenci Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {first_name_st ? first_name_st : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Öğrenci Soyadı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {last_name_st ? last_name_st : "null"}
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
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              helperText="Kullanılacak ders ID'sini girin."
              label="Ders ID"
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
              onClick={handleFetchData_course}
            >
              Ders Verisi Getir
            </Button>
          </Box>


          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ders Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {name ? name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Ders Kodu
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {code ? code : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ders Dönemi
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {semester ? semester : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {courseInstructors && courseInstructors.length > 0 && (
            <div>
              <h3>Akademisyen Görevlendirmeleri</h3>
              <Grid container spacing={2}>
                {courseInstructors.map((instructor, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ marginTop: 2 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Akademisyen Adı: {instructor?.instructor?.first_name ?? 'Bilgi yok'} {instructor?.instructor?.last_name ?? 'Bilgi yok'}
                        </Typography>
                        <Typography variant="body2">
                          ID: {instructor?.instructor?.userId ?? 'Bilgi yok'}
                        </Typography>
                        <Typography variant="body2">
                          Bölüm: {instructor?.instructor?.department ?? 'Bilgi yok'}
                        </Typography>
                        <Typography variant="body2">
                          Görevlendirme Tarihi: {instructor?.assigned_date ? new Date(instructor.assigned_date).toLocaleDateString() : 'Bilgi yok'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              helperText="Ders kaydında yer alacak akademisyenin kullanıcı ID'sini girin."
              label="Akademisyen Kullanıcı ID"
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
              onClick={handleFetchData}
            >
              Akademisyen Verisi Getir
            </Button>
          </Box>



          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Akademisyen Adı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {first_name ? first_name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Akademisyen Soyadı
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {last_name ? last_name : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Akademisyen Bölüm
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {department ? department : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>



          <FormControl fullWidth required>
            <InputLabel id="role-label">Ders Dönemi</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="DROPPED">DROPPED</MenuItem>
              <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            slotProps={{
              textField: {
                helperText: 'Ders kayıt tarihini yazınız',
              },
            }}
            onChange={(newValue) => setEnrollmentDate(newValue)}
            sx={{ minWidth: "100%" }} value={enrollment_date} label="Ders Kayıt Tarihi" />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Oluşturuluyor..." : "Ders kayıt Oluştur"}
          </Button>
          {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
          {data && <p style={{ color: "green" }}>Ders kayıt başarıyla oluşturuldu!</p>}

        </Box>
      </LocalizationProvider>
    </>
  );
}
