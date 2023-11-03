import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono de usuario
import * as React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import LogoutIcon from '@mui/icons-material/Logout';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar({ showsSignInOptions = true, isStudent = false, isProfessor = false }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        {!showsSignInOptions && (
          <>
          <Box sx={{flex:1, display : 'flex', justifyContent : 'flex-start', alignItems: "center" }}>
          <Link
            href="/"
            variant="h6"
            underline="none"
            color="inherit"
            alignItems="flex-end"
            sx={{ fontSize: 24 }}
          >
            {'FIUDEMY'}
          </Link>
          {
            isStudent && (
              <Box>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/student-home/"
                sx={rightLink}
              >
                {'Mis cursos'}
              </Link>
              <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/marketplace/"
              sx={rightLink}
            >
              {'Marketplace'}
            </Link>
            </Box>
            
            )

          }
          {
            isProfessor && (
              <Box>
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/professor-home/"
                sx={rightLink}
              >
                {'Mis cursos'}
              </Link>
           
            </Box>
            
            )

          }
          </Box>
          
          <Box sx={{flex:1, display : 'flex', justifyContent : 'flex-end', alignItems: "center" }}>

          <IconButton
            color="inherit"
            onClick={handleIconClick}
            aria-describedby={anchorEl ? 'user-menu' : undefined}
          >
          <AccountCircleIcon />
          </IconButton>
          <Popover
            id="user-menu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
          <List>
          <Box sx={{flex:1, display : 'flex', justifyContent : 'flex-end', alignItems: "center" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in/"
              sx={{
                ...rightLink,
                display: 'flex',
                alignItems: 'flex-start',
                color: 'black',
                ml: 1,
              }}
            >
              <Typography sx={{ ml: 1 , fontFamily: 'Arial, sans-serif' }}>
                {'Cerrar Sesión'}
              </Typography>
            </Link>
            </Box>
          </List>
          </Popover>
          </Box>
          </>
        )}


          {showsSignInOptions && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              alignItems="flex-end"
              sx={{ fontSize: 24 }}
            >
            {'FIUDEMY'}
            </Link>
            </Box>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in/"
              sx={rightLink}
            >
              {'Iniciar sesión'}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up/"
              sx={{ ...rightLink, color: 'secondary.main' }}
            >
              {'Regístrate'}
            </Link>
          </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
