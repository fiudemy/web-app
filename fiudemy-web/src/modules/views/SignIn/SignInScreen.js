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
import { useState } from "react";
import {createUser, logIn} from "../../../services/axios_utils";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = await logIn(event.currentTarget['email'].value);
    const userId = userData[0];
    const userRole = userData[1];
    localStorage.setItem("userId", userId);
    localStorage.setItem("userRole", userRole);
    if (userRole === "student") {
        navigate("/student-home");
    } else {
        navigate("/professor-home");
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
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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