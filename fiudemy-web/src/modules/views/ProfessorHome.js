import { Box, Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import Typography from '../components/Typography';
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

  const handleAddCourse = () => {
    if (newCourse.name && newCourse.description) {
      setCursos([...cursos, newCourse]);
      setNewCourse({ name: '', description: '' });
    }
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
          <TextField
            label="Nombre del curso"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción del curso"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleAddCourse}>
            Añadir curso
          </Button>
        </Paper>
      </Box>
    </>
  );
}
