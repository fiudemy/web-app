import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import CourseModal from '../components/ModalCourse';
import { CoursesGrid } from '../components/courses/CoursesGrid';

export default function TeacherHome() {
  const [cursos, setCursos] = useState([
    {
      name: 'Matemáticas',
      description: 'Aprende matemáticas de una forma fácil y divertida',
    },
    {
      name: 'Física',
      description: 'Aprende física de una forma fácil y divertida',
    },
  ]);

  const [newCourse, setNewCourse] = useState({ name: '', description: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description) {
      setCursos([...cursos, newCourse]);
      setNewCourse({ name: '', description: '' });
    }
  };
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
        <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
          Mis cursos
        </Typography>
        <CoursesGrid courses={cursos} />
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