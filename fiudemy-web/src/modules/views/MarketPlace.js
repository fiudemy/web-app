import * as React from 'react';
import Typography from '../components/Typography';
import Paper from '@mui/material/Paper';
import { Box, Button, ButtonBase, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import AppAppBar from './AppAppBar';
import { useNavigate } from 'react-router-dom';


const categories = [
  'Maths', 'Physics', 'Chemistry', 'Biology', 'Programming'
]

export const CourseMarketBox = ({course}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonBase onClick={handleOpen}>
        <Paper sx={{ p: 2, mb: 4, mr: 1,  width: 250, height: 150,  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', cursor: 'pointer', textAlign: 'left'}}>
          <Typography variant="h6"> {course.title} </Typography>
          <Typography>{course.description}</Typography>
        </Paper>
      </ButtonBase>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <MarketPopupBody course={course} />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}



const MarketPopupBody = ({course}) => {
  const navigate = useNavigate();

  const handlePay = (course) => {
  
    const paymentData = {
      user_id: '65233646667fb42d32918fc7', // replace with actual user ID
      course_id: course.id,
    };
    fetch('https://fiudemy.onrender.com/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })
      .then(response => response.json())
      .then(data => {
        navigate('/student-home')
      })
      .catch(error => console.error(error));
  };
  return (
    <>
   <DialogTitle>{course.name}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="200"
          // image={course.image}
          image={'https://images.shiksha.com/mediadata/images/articles/1681209899php8OqvF2.jpeg'}
          alt={course.name}
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt:6 }}>Descripcion</Typography>
        <Typography>{course.description}</Typography>
        <Typography variant="h6" sx={{ mt:6 }}>Duración</Typography>
        <Typography>{course.duration + " horas"}</Typography>
        <Button variant="contained" color="success" sx={{ mt: 6, width: '40%', color: '#fff' }} onClick={() => handlePay(course)}>
          Pagar
        </Button>
      </DialogContent>
    </>
  );
}


const MarketCoursesGrid = ({courses}) => {
  return (
      <Grid container spacing={2} sx={{ mt: 2, ml: 3, mb: 6 }}> 
        {courses.map((course, index) => (
          <Grid item key={index} >
            <CourseMarketBox course={course} />
          </Grid>
        ))}
      </Grid>
  );
}

export default function MarketPlace() {
  const [selectedCategory, setSelectedCategory] = useState(''); // Set the default value to an empty string
  const [courses, setCourses] = useState([]);
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  useEffect(() => {
    fetch('https://fiudemy.onrender.com/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data.results);
      })
      .catch(error => console.error(error));
  }, []);
  const filteredCourses = selectedCategory ? courses.filter(course => course.category === selectedCategory) : courses;

  return (
   <>
      <AppAppBar showsSignInOptions={false} />
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
      <MarketCoursesGrid courses={filteredCourses} />
      </Box>
    </>
  );
}