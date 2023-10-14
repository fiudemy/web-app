import * as React from 'react';
import Typography from '../components/Typography';
import Paper from '@mui/material/Paper';
import { CoursesGrid } from '../components/courses/CoursesGrid';
import { Box } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';


const cursos = [
  {
    name : 'Matematicas',
    description : 'Aprende matematicas de una forma facil y divertida',
    category : 'Matematicas',

  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
    category : 'Fisica',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
    category : 'Fisica',
  },
  {
    name: 'Fisica',
    description : 'Aprende fisica de una forma facil y divertida',
    category : 'Fisica',
  },
]

const categories = [
  'Matematicas', 'Fisica', 'Quimica', 'Biologia', 'Programacion'
]

export const CourseHomeBox = ({course}) => {
  return (
    <Paper sx={{ p: 2,  maxWidth: 250 }}>
      <Typography variant="h6"> {course.name} </Typography>
      <Typography>{course.description}</Typography>
    </Paper>
  );
}

export default function MarketPlace() {
  const [selectedCategory, setSelectedCategory] = useState(''); // Set the default value to an empty string

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredCourses = selectedCategory ? cursos.filter(course => course.category === selectedCategory) : cursos;

  return (
   <>
      <Box sx={{ marginBottom: '900px', marginTop: '30px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Marketplace
      </Typography>
      <FormControl sx={{minWidth: 120, marginBottom: '20px', marginTop: '30px', marginLeft: '30px'}}>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      <CoursesGrid courses={filteredCourses} />
      </Box>
    </>
  );
}