import { Box } from '@mui/material';
import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductDescriptionLayout';
import ProductValues from "./ProductValues";

const backgroundImage =
  'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-43133.jpg';

export default function ProfessorInit() {
  return (
    <>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: '#7fc7d9',
          backgroundPosition: 'center',
        }}
      >
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography
              color="inherit"
              align="center"
              variant="h2"
              marked="center"
            >
              Enseña con nosotros
            </Typography>
            <Typography
              color="inherit"
              align="center"
              variant="h5"
              sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
            >
              Sumate a una nueva forma de aprendizaje
            </Typography>
          </Box>
          <Box ml={5}> {}
            <img
              src={backgroundImage}
              alt="Descripción de la imagen"
              style={{ width: '700px', height: 'auto' }}
            />
          </Box>
        </Box>
      </ProductHeroLayout>
      <ProductValues />
    </>
  );
}
