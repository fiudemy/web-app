import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { React, useEffect, useState } from 'react';
import { createCourse, getCourses } from '../../services/axios_utils';
import CourseModal from '../components/ModalCourse';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import AppAppBar from './AppAppBar';

export default function TeacherHome() {
  const [cursos, setCursos] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '' , category : 'otros', price : 0, hours : 0});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherData, setTeacherData] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (Array.isArray(response.results)) {
          const courses = response.results;
          const teacherEmail = localStorage.getItem("email");
          if (teacherEmail) {
            const filteredCourses = courses
              .filter(course => course.teacher === teacherEmail)
              .map(filteredCourse => ({
                id: filteredCourse.id,
                title: filteredCourse.title,
                description: filteredCourse.description,
                category : filteredCourse.category,
                price: filteredCourse.price,
                hours: filteredCourse.hours,
                sections: filteredCourse.sections,
                active: filteredCourse.active
              }));
            setCursos(filteredCourses);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    //const datateacher = JSON.parse(localStorage.getItem('teacherData'))
    console.log("Curso nuevo: ", newCourse);
    const teacherEmail = localStorage.getItem("email");
  
      await createCourse({
        title: newCourse.title,
        description: newCourse.description,
        teacher: teacherEmail,
        category: newCourse.category,
        price: newCourse.price,
        hours: newCourse.hours,
        active: false,
        sections: []
      });
    
    window.location.reload();
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AppAppBar showsSignInOptions={false} isProfessor={true}/>

      <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
        <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
          Mis cursos
        </Typography>
        <CoursesGrid courses={cursos} isStudent={false}  />
      </Box>

      <Box sx={{ marginBottom: '30px', ml: 3 }}>
        <Typography variant="h6" marked={'left'}>
          Añadir nuevo curso
        </Typography>
        <Paper sx={{ p: 2, maxWidth: 350 }}>
        <Button
            variant="contained"
            color="primary"
            onClick={openModal}
            style={{
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                minWidth: 0,
                padding: 0,
            }}
            >
                <AddIcon />
            </Button>
        </Paper>
      </Box>

      <CourseModal
        open={isModalOpen}
        onClose={closeModal}
        onAddCourse={handleAddCourse}
        newCourse={newCourse}
        setNewCourse={setNewCourse}
      />
    </>
  );
}