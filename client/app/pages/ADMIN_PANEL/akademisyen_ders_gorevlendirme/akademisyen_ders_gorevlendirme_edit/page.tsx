
"use client"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {  GET_INSTRUCTORS_BY_ID } from '@/app/GraphQL/AkademisyenSorgu';
import { Button } from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { GET_COURSE_BY_ID } from '@/app/GraphQL/DersSorgu';
import { UPDATE_INSTRUCTORS_COURSE, GET_INSTRUCTORS_COURSE_BY_ID } from '@/app/GraphQL/AkademisyenDersGorevlendirmeSorgu';


export default function AkademisyenGorevlendirmeEdit() {





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
  const [courseData, setCourseData] = useState({ name: "", code: "", semester: "" })
  const [name, setName] = useState(courseData.name)
  const [code, setCode] = useState(courseData.code)
  const [semester, setSemester] = useState(courseData.semester)


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
    }
  };


  const [assigned_date, setAssignedData] = useState<Dayjs | null>(dayjs('2022-04-17'))


  const [courseIC_id,setCourseIC_id]=useState("")
  const instructors_course_query_by_id = useQuery(GET_INSTRUCTORS_COURSE_BY_ID, {
    variables: { id: parseFloat(courseIC_id as string) },
    skip: true, // Başlangıçta sorguyu atla 
  });

  
  const [courseInstructorsData, setIInstructorsCourseData] = useState({ name: "", code: "", assigned_date: "" ,first_name:"",last_name:"",course_id:"",userId:""})
  const [nameIC, setNameIC] = useState(courseInstructorsData.name)
  const [codeIC, setCodeIC] = useState(courseInstructorsData.code)
  const [assigned_dateIC, setAssigned_dateIC] = useState(courseInstructorsData.assigned_date)
  const [first_nameIC,setFirst_name_IC] = useState(courseInstructorsData.first_name)
  const [last_nameIC,setLast_name_IC] = useState(courseInstructorsData.last_name)
  const [courseId_ic,setCourseId_ic] = useState(courseInstructorsData.course_id)
  const [userId_ic,setUserId_ic] = useState(courseInstructorsData.userId)

  const handleFetchData_course_instructors = async () => {
    if (courseIC_id) {
      const { data } = await instructors_course_query_by_id.refetch({ id: parseFloat(courseIC_id as string) });
      setIInstructorsCourseData(data.getCourseInstructorById);
      setNameIC(data.getCourseInstructorById.course.name);
      setCodeIC(data.getCourseInstructorById.course.code);
      setAssigned_dateIC(data.getCourseInstructorById.assigned_date)
      setFirst_name_IC(data.getCourseInstructorById.instructor.first_name)
      setLast_name_IC(data.getCourseInstructorById.instructor.last_name)
      setCourseId_ic(data.getCourseInstructorById.course.id)
      setUserId_ic(data.getCourseInstructorById.instructor.userId)
    }
  };


  const [updateIC, { loading, error, data }] = useMutation(UPDATE_INSTRUCTORS_COURSE);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await updateIC({
        variables: {
          updateCourseInstructorDto: {
            id:parseFloat(courseIC_id as string),
            courseId: parseFloat(courseId as string),
            instructorId: parseFloat(userId as string),
            assigned_date: assigned_date?.toISOString(),
          },
        },
      });
      alert(`Akademisyen görevlendirme güncellendi: ${data}`);
    } catch (error) {
      alert(`Akademisyen görevlendirme oluşturma hata:, ${error}`);
    }
  };



  return (

    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              value={courseIC_id}
              onChange={(e) => setCourseIC_id(e.target.value)}
              helperText="Güncellenece ders görevlendirme ID'sini girin."
              label="Ders Görevlendirme ID"
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
              onClick={handleFetchData_course_instructors}
            >
              Görevlendirme Verisi Getir
            </Button>
          </Box>
          <Card sx={{ width: "100%", flexDirection: "row", display: "flex" }}>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Ders Bilgisi
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {courseId_ic ? courseId_ic : "null"}
                {"\t\t"}
                  {nameIC ? nameIC : "null"}
                  {"\t\t"}
                  {codeIC ? codeIC : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1, }}>

              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  Görevli Akademisyen
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {first_nameIC ? first_nameIC : "null"}
                {"\t\t"}
                {last_nameIC ? last_nameIC : "null"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Görevli Akademisyen ID
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {userId_ic?userId_ic:"null"} {"\t\t"}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea sx={{ mb: 1, height: "100%", flex: 1 }}>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Görevlendirme Tarihi
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {assigned_dateIC ? assigned_dateIC : "null"}
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
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              helperText="Görevlendirilecek akademisyenin kullanıcı ID'sini girin."
              label="Kullanıcı ID"
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

          <DatePicker
            slotProps={{
              textField: {
                helperText: 'Ders görevlendirme kayıt tarihini yazınız',
              },
            }}
            onChange={(newValue) => setAssignedData(newValue)}
            sx={{ minWidth: "100%" }} value={assigned_date} label="Ders Görevlendirme Kayıt Tarihi" />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Güncelleniyor..." : "Akademisyeni görevlendirme güncelle"}
          </Button>
          {error && <p style={{ color: "red" }}>Hata: {error.message}</p>}
          {data && <p style={{ color: "green" }}>Akademisyen görevlendirme başarıyla güncellendi!</p>}

        </Box>
      </LocalizationProvider>
    </>
  );
}
