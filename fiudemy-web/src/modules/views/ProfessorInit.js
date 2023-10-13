import { Box } from '@mui/material';
import React, { useState } from 'react';
import SignIn from '../../SignIn';
import SignUp from '../../SignUp';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductDescriptionLayout';
import ProductValues from "./ProductValues";

const backgroundImage =
  'https://img.freepik.com/premium-photo/abstract-background-images-wallpaper-ai-generated_643360-43133.jpg';

export default function ProfessorInit() {

    const [showSignIn, setShowSignIn] = useState(false);

    const toggleSignIn = () => {
      setShowSignIn(!showSignIn);
    };


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
              Enseñá con nosotros
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
          <Box
            ml={5}
            alignItems='center'
            style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            {showSignIn ? <SignIn route="/professor-home"/> : <SignUp route="/professor-home" />}
            <label style={{ color: '#000', opacity : 0.6 , cursor : 'pointer' , textDecoration : 'underline'}} onClick={toggleSignIn} > 
              {showSignIn ? '¿Todavía no tenés una cuenta?' : '¿Ya tenés una cuenta?' }
               </label>
            {/* <button
                style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px',
                width: '75%',
                height: '50px',
                backgroundColor: '#fff',
                borderRadius: '25px',
                transition: 'all 0.4s',
                border: '2px solid #fd628a',
                marginTop: '20px',
                cursor: 'pointer',
                color: '#000',
                }}
                onClick={toggleSignIn}
                title='TOGGLE'
            >
                <div
                style={{
                    fontFamily: 'sans-serif',
                    fontWeight: '900',
                    fontSize: '16px',
                    lineHeight: '1.2',
                    textTransform: 'uppercase',
                }}
                >
                {showSignIn ? 'Registrarse' : 'Iniciar Sesión'}
                </div>
            </button> */}
            </Box>
        </Box>
      </ProductHeroLayout>
      <ProductValues />
    </>
  );
}
