import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AppAppBar from '../AppAppBar';
import { useNavigate } from "react-router-dom";
import {logIn} from "../../../services/axios_utils";
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SignIn() {
  const location = useLocation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.isAlertOpen) {
      setIsAlertOpen(true);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.currentTarget['email'].value;
    const password = event.currentTarget['password'].value;
    const userData = await logIn(email);
    const userId = userData[0];
    const userRole = userData[1];
    const fullName = userData[2];
    localStorage.setItem("email", email);
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("fullName", fullName);

    if (!email || !password) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    try {
      if (userRole === "student") {
        navigate("/student-home");
      } else {
          navigate("/professor-home");
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <AppAppBar />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isAlertOpen && ( 
            <Alert 
              variant="outlined" 
              severity="success" 
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
              open={isAlertOpen} 
              onClose={() => setIsAlertOpen(false)}>
                Tu cuenta fue creada con éxito!
            </Alert>
          )}
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {formError && (
              <Typography variant="body2" color="error" marginBottom={2}>
                {formError}
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign-up/" variant="body2">
                  No tenes una cuenta? Registrate
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}