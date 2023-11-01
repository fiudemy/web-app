import * as React from 'react';
import Typography from '../components/Typography';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import AppAppBar from './AppAppBar';



export default function StudentHome() {
  const [courses, setCourses] = useState([]);
  const [hotCourses, setHotCourses] = useState([]);
  const userId = '65233646667fb42d32918fc7';
  console.log('courses', courses);
  useEffect(() => {
    fetch(`https://fiudemy.onrender.com/courses?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        setCourses(data.results);
      })
      .catch(error => console.error(error));
  }, [userId]);
 
  useEffect(() => {
    fetch( 'https://fiudemy.onrender.com/courses?sort_by=purchase_count&ascending=false&limit=10')
      .then(response => response.json())
      .then(data => {
        setHotCourses(data.results);
      })
      .catch(error => console.error(error));
  }, []);
  return (
       <>
        <AppAppBar showsSignInOptions={false} isStudent={true} />
      <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Mis cursos
      </Typography>
      <CoursesGrid courses={courses} />
      </Box>

      <Box sx={{ marginBottom: '300px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Descubre cursos destacados
      </Typography>
      <CoursesGrid courses={hotCourses} />
      </Box>
      </>
  );
}