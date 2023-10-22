import * as React from 'react';
import Typography from '../components/Typography';
import Paper from '@mui/material/Paper';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import { Box } from '@mui/material';


const cursos = [
  {
    name : 'Matematicas',
    description : 'Aprende matematicas de una forma facil y divertida',

  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
  {
    name : 'Matematicas',
    description : 'Aprende matematicas de una forma facil y divertida',

  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
  },
]

export const CourseHomeBox = ({course}) => {
  return (
    <Paper sx={{ p: 2,  maxWidth: 250 }}>
      <Typography variant="h6"> {course.name} </Typography>
      <Typography>{course.description}</Typography>
    </Paper>
  );
}

export default function StudentHome() {
  return (
   <>
      <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Mis cursos
      </Typography>
      <CoursesGrid courses={cursos} />
      </Box>

      <Box sx={{ marginBottom: '300px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Descubre cursos destacados
      </Typography>
      <CoursesGrid courses={cursos} />
      </Box>
      </>
  );
}