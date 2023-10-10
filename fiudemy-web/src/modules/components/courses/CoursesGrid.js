import * as React from 'react';
import Grid  from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '../Typography';

const CourseHomeBox = ({course}) => {
  return (
    <Paper sx={{ p: 2,  maxWidth: 250 }}>
      <Typography variant="h6"> {course.name} </Typography>
      <Typography>{course.description}</Typography>
    </Paper>
  );
}

export const CoursesGrid = ({courses}) => {
  return (

      <Grid container spacing={2} sx={{ mt: 2, ml: 3, mb: 6 }}> 
        {courses.map((course, index) => (
          <Grid item key={index} >
            <CourseHomeBox course={course} />
          </Grid>
        ))}
      </Grid>
    
  );
}