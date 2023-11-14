import * as React from 'react';
import Typography from '../components/Typography';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import AppAppBar from './AppAppBar';
import { useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function StudentHome() {
  const [courses, setCourses] = useState([]);
  const [hotCourses, setHotCourses] = useState([]);
  const userId = localStorage.getItem('userId');
  const location = useLocation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    fetch(`https://fiudemy.onrender.com/courses?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        console.log( " and data.results is " + JSON.stringify(data.results));
        setCourses(data.results);
      })
      .catch(error => console.error(error));
  }, [userId]);
 
  useEffect(() => {
    fetch( 'https://fiudemy.onrender.com/courses?sort_by=purchase_count&ascending=false&limit=10')
      .then(response => response.json())
      .then(data => {
        const filteredCourses = data.results.filter(course => !courses.some(c => c.id === course.id));
        setHotCourses(filteredCourses);
      })
      .catch(error => console.error(error));
  }, [courses]);

  useEffect(() => {
    if (location.state && location.state.isAlertOpen) {
      setIsAlertOpen(true);
    }
  }, [location.state]);

  return (
       <>
        <AppAppBar showsSignInOptions={false} isStudent={true} />
      <Box sx={{ marginBottom: '5px', marginTop: '30px' }}>
      {isAlertOpen && ( 
        <Alert 
          variant="filled" 
          severity="success" 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
          open={isAlertOpen} 
          onClose={() => setIsAlertOpen(false)}>
          Compra exitosa! Disfrute del nuevo curso.
        </Alert>
      )}
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Mis cursos
      </Typography>
      <CoursesGrid courses={courses} />
      </Box>
      <Box sx={{ marginBottom: '100px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Descubre cursos destacados
      </Typography>
      <CoursesGrid courses={hotCourses} />
      </Box>
      </>
  );
}