import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Icono de usuario
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import * as React from 'react';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar({ showsSignInOptions = true, isStudent = false, isProfessor = false,
                   isChat = false, courseId=null}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChatClick = (event) => {
    navigate('/chats')
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${localStorage.getItem("userId")}`);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
        {!showsSignInOptions && (
          <>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            alignItems="flex-end"
            sx={{ fontSize: 24 }}
          >
            {'FIUDEMY'}
          </Link>
          <Box sx={{flex:1, display : 'flex', justifyContent : 'flex-start', alignItems: "center" }}>
          {
            isStudent && !isChat && (
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
              <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/users/"
              sx={rightLink}
              >
                {'Usuarios'}
              </Link>
            </Box>
            )
          }
          {
            isProfessor && !isChat && (
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
              {
                courseId && (
                  <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    href={"/evaluations/" + courseId}
                    sx={rightLink}
                  >
                    {'Evaluaciones'}
                  </Link>
                )
              }
            </Box>
            )
          }
            {
               isChat && (
                  <Box>
                    <Link
                       color="inherit"
                       variant="h6"
                       underline="none"
                       href="/professor-home/"
                       sx={rightLink}
                    >
                      {'Mis chats'}
                    </Link>
                  </Box>
               )
            }
          </Box>
          <Box sx={{flex:1, display : 'flex', justifyContent : 'flex-end', alignItems: "center" }}>
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <IconButton
                 color="inherit"
                 onClick={handleChatClick}
                 aria-describedby={anchorEl ? 'user-menu' : undefined}
              >
                <ChatBubbleIcon />
              </IconButton>
                <IconButton
                    color="inherit"
                    onClick={handleIconClick}
                    aria-describedby={anchorEl ? 'user-menu' : undefined}
                >
                <AccountCircleIcon />
                </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                Mi perfil
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Cerrar sesión
              </MenuItem>
            </Menu>
          </React.Fragment>
          </Box>
          </>
        )}
          {showsSignInOptions && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: "center" }}>
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
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
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
