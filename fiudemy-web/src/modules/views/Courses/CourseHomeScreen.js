import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { CourseToolBar } from '../../components/courses/CourseToolBar';
import theme from '../../../modules/theme';

export default function CourseHome() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CourseToolBar/>
        {/* Codigo para cada seccion de los cursos*/}
      </Box>
    </ThemeProvider>
  );
}