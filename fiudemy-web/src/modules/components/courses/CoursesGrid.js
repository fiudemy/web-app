import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import Typography from '../Typography';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import { CourseMarketBox } from '../../views/MarketPlace';

const CourseHomeBox = ({course, isStudent}) => {
  const navigate = useNavigate();
  const redirectToViewCourse = () => {
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
        height: 400,
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}
    >
      <div>
        <Typography variant="h6">{course.title}</Typography>
        <Typography >{course.description}</Typography>
        <img
        src="https://img.freepik.com/vector-premium/taza-cafe-libro-computadora-libro-pantalla-sobre-fondo-blanco-colorido-isometrico_18591-62673.jpg"
        alt="Imagen del curso"
        style={{ width: '90%', height: 'auto', position: 'absolute', bottom: '1px', right: '8px', left: '14px', marginBottom: '40px'  }}
      />
      </div>
      {isStudent === false && (
        <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {
            course.active ? (
              "Curso activo"
            ) : (
              "El curso no esta activo"
            )
          }
        </Typography>
      )}
      <Button
        onClick={redirectToViewCourse}
        sx={{
          position: 'absolute',
          bottom: '3px',
          right: '8px',
          color: '#FF0664',
        }}
      >
        Ver curso
      </Button>
    </Paper>
    </div>
  );
}

const NoCoursesAvailable = ()=> {
  return(
    <Paper sx={{ p: 2, mb: 4, mr: 1,  width: 250, height: 150,  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>
      <Typography variant="h6" sx={{ color: 'rgba(0, 0, 0, 0.5)' }}> No tienes cursos disponibles </Typography>
      <Typography sx={{ color: 'rgba(0, 0, 0, 0.5)' }}> Agrega nuevos cursos para continuar</Typography>
  </Paper>
  )
}


export const CoursesGrid = ({courses,isStudent, isHotCourses = false}) => {
  return (
      <Grid container spacing={2} sx={{ mt: 2, ml: 3, mb: 6 }}> 
        {
          courses.length === 0 ? (
            <NoCoursesAvailable/>
          ) :
        courses.map((course, index) => (
          <Grid item key={index} >
            {
              isHotCourses ? (
                <CourseMarketBox course={course} userComesFromHotCourses={true}/>
              ) : (
                <CourseHomeBox course={course} isStudent= {isStudent} />
              )
            }
            
          </Grid>
        ))}
      </Grid>
    
  );
}