import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
              <SchoolIcon sx={{ fontSize: 55, color: 'primary.main' }} /> 
              <Typography variant="h6" sx={{ my: 3, textAlign: 'center' }}>
                Variedad de Contenido Educativo
              </Typography>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {
                  'Accede a una amplia variedad de cursos, lecciones y recursos educativos en un solo lugar.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
              <AccessibilityNewIcon sx={{ fontSize: 55, color: 'primary.main' }} /> 
              <Typography variant="h6" sx={{ my: 3, textAlign: 'center' }}>
                Flexibilidad y Accesibilidad
              </Typography>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {
                  'Aprendé y enseña a tu propio ritmo y desde cualquier lugar. Programá tus lecciones cuando te convenga.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} />
              <CheckCircleIcon sx={{ fontSize: 55, color: 'primary.main' }} /> 
              <Typography variant="h6" sx={{ my: 3, textAlign: 'center' }}>
                Evaluación y Retroalimentación
              </Typography>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                {'Obtené y realiza evaluaciones detalladas y retroalimentación personalizada.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;