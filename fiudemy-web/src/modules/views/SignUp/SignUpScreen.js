import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import AppAppBar from '../AppAppBar';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../../services/axios_utils";

export default function SignUp() {
  const navigate = useNavigate();
  const [isProfessor, setIsProfessor] = useState(false);
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const firstName = event.currentTarget['firstName'].value;
    const lastName = event.currentTarget['lastName'].value;
    const email = event.currentTarget['email'].value;
    const password = event.currentTarget['password'].value;

    if (!firstName || !lastName || !email || !password) {
      setFormError("Todos los campos son obligatorios.");
      return;
    }

    const role = isProfessor ? 'teacher' : 'student';
    const reqData = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    try {
      await createUser(reqData);
      navigate("/sign-in", { state: { isAlertOpen: true } });
      console.log("Registro exitoso");
    } catch (error) {
      // Handle error if registration fails
      console.error(error);
      // You can set another state variable to display a different error message
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          {formError && (
            <Typography variant="body2" color="error" marginBottom={2}>
              {formError}
            </Typography>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
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
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={isProfessor}
                    onChange={() => setIsProfessor(!isProfessor)}
                    color="primary"
                  />
                }
                label="Soy profesor"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in/" variant="body2">
                Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
