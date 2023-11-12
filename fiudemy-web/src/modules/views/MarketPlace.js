import * as React from 'react';
import Typography from '../components/Typography';
import Paper from '@mui/material/Paper';
import { Box, Button, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import AppAppBar from './AppAppBar';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Matemática', 'Física', 'Química', 'Biología', 'Programación'
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
      <Button
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: '3px',
          right: '8px',
          color: '#008000',
        }}
      >
        Comprar curso
      </Button>
    </Paper>
    </div>

    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <MarketPopupBody course={course} handleClose={handleClose} />
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
    </Dialog>
    </>
);
};

const MarketPopupBody = ({course}) => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  }
  const stripePromise = loadStripe('pk_test_51O6fnvFBm8GLWu3OGqErysFBeJakCDg8cFmSSSdcmid2D7mHCezxh6npUuRAtUPiXtZjJgpuw8cl7TmurgYQSWSb00WM0M7FS5');
  const options = {
    mode: 'payment',
    amount: 1099,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {
      theme: 'stripe'
    },
  };
  return (
    <>
      <DialogTitle>{course.name}</DialogTitle>
      <DialogContent>
        <CardMedia
          component="img"
          height="200"
          image={'https://images.shiksha.com/mediadata/images/articles/1681209899php8OqvF2.jpeg'}
          alt={course.name}
          sx={{ mt: 2 }}
        />
        <Typography variant="h6" sx={{ mt: 6 }}>
          Descripcion
        </Typography>
        <Typography>{course.description}</Typography>
        <Typography variant="h6" sx={{ mt: 6 }}>
          Duración
        </Typography>
        <Typography>{course.hours + " horas"}</Typography>
        <Button variant="contained" color="success" sx={{ mt: 6, width: '40%', color: '#fff' }} onClick={handleClick}>
          Pagar
        </Button>
        <Dialog open={open} maxWidth="md" fullWidth={true} fullHeight={true} sx={{ width: '50%', height: '100%', margin: 'auto'}}>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm courseId={course.id}/>
        </Elements>
        </Dialog>
      </DialogContent>
    </>
  );
};

const PaymentForm = ({courseId}) => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);
  const formContainerStyles = {
    width: '540px', // Ancho del 100% del contenedor padre
    height: '340px', // Altura personalizada, puedes ajustarla según tus necesidades
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px',
  };

  const handlePay = (courseId) => {
    const paymentData = {
      user_id: localStorage.getItem('userId'),
      course_id: courseId,
    };
    
    /*const paymentElement = elements.getElement('payment');
    if (paymentElement && !paymentElement._complete) {
      setFormError('Compra rechazada. Todos los campos son obligatorios.');
      return;
    }*/

    fetch('https://fiudemy.onrender.com/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(paymentData)
    })
      .then(response => response.json())
      .then(data => {
        navigate("/student-home", { state: { isAlertOpen: true } });
      })
      .catch(error => console.error(error));
  };
  
  return (
    <div style={formContainerStyles}>
    <PaymentElement/>
    <Typography sx={{ mt: 2, ml: 3, textAlign: 'center', fontSize: '11px',}}>
        Aviso: a la hora de comprar el curso, tenga en cuenta que en caso de que este 
        quede inactivado por el profesor, usted no podrá utilizarlo hasta que este 
        vuelva a ser activado. 
        ¡Que disfrute su compra!
    </Typography>
    {formError && <Typography variant="body2" color="error" >{formError}</Typography>}
    <Button variant="contained" color="success" sx={{ mt: 1, color: '#fff' }} onClick={() => handlePay(courseId)}>
      Pagar
    </Button>
    </div>
  );
};

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
        <AppAppBar showsSignInOptions={false} isStudent={true} />
      <Box sx={{ marginBottom: '100px', marginTop: '30px' }}>
      <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
        Marketplace
      </Typography>
      <Box sx={{ minWidth: 100}}>
      <FormControl sx={{minWidth: '95%', marginBottom: '20px', marginTop: '30px', marginLeft: '30px'}}>
      <InputLabel id="category-select-label">Categorias</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            label="Categorias"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Todos</MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
      <MarketCoursesGrid courses={filteredCourses} />
      </Box>
    </>
  );
}
