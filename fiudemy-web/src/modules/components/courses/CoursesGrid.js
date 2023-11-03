import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Typography from '../Typography';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

const CourseHomeBox = ({course, isStudent}) => {
  const navigate = useNavigate();
  const redirectToEditCourse = () => {
      navigate(`/courses/${course.id}`, { state: { course }});
  }
  return (
    <div style={{ display: 'grid', justifyContent: 'center', alignItems: 'flex-start' }}>
    <Paper
      sx={{
        p: 2,
        mb: 1,
        mr: 1,
        width: 300,
        height: 200,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}
    >
      <div>
        <Typography variant="h6">{course.title}</Typography>
        <Typography >{course.description}</Typography>
      </div>
      {isStudent === false && (
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          El curso no está activo
        </Typography>
      )}
      <Button
        onClick={redirectToEditCourse}
        sx={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          color: '#FF0664',
        }}
      >
        Editar curso
      </Button>
    </Paper>
    </div>
  );
}

const NoCoursesAvailable = ()=> {
  return(
    <Paper sx={{ p: 2, mb: 4, mr: 1,  width: 250, height: 150,  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>
      <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.5)' }}> No tienes cursos disponibles </Typography>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}> agrega nuevos cursos para continuar</Typography>
  </Paper>
  )
}


export const CoursesGrid = ({courses,isStudent}) => {
  return (
      <Grid container spacing={2} sx={{ mt: 2, ml: 3, mb: 6 }}> 
        {
          courses.length == 0 ? (
            <NoCoursesAvailable/>
          ) :
        courses.map((course, index) => (
          <Grid item key={index} >
            <CourseHomeBox course={course} isStudent= {isStudent} />
          </Grid>
        ))}
      </Grid>
    
  );
}