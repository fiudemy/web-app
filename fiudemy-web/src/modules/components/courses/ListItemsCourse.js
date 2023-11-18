import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import QuizIcon from '@mui/icons-material/Quiz';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

export const NestedList = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleExit = () => {
      navigate('/student-home'); //Hay que chequear si es estudiante o profesor para que lo redirija correctamente
  }

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick} sx={{ color: 'black' }}>
        <ListItemIcon sx={{ color: 'black' }}>
          <DensitySmallIcon />
        </ListItemIcon>
        <ListItemText primary="Módulos" sx={{ color: 'black' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          <ListItemButton sx={{ pl: 4, color: 'black' }}>
            <ListItemIcon sx={{ color: 'black' }}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Módulo 1" sx={{ color: 'black' }} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: 'black' }}>
            <ListItemIcon sx={{ color: 'black' }}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Módulo 2" sx={{ color: 'black' }} />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4, color: 'black' }}>
            <ListItemIcon sx={{ color: 'black' }}>
              <ChevronRightIcon />
            </ListItemIcon>
            <ListItemText primary="Módulo 3" sx={{ color: 'black' }} />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton sx={{ color: 'black' }}>
        <ListItemIcon sx={{ color: 'black' }}>
          <QuizIcon />
        </ListItemIcon>
        <ListItemText primary="Evaluaciones" sx={{ color: 'black' }} />
      </ListItemButton>
      <ListItemButton sx={{ color: 'black' }}>
        <ListItemIcon sx={{ color: 'black' }}>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="Foro de consultas" sx={{ color: 'black' }} />
      </ListItemButton>
      <ListItemButton sx={{ color: 'black' }}>
        <ListItemIcon sx={{ color: 'black' }}>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Chat del curso" sx={{ color: 'black' }} />
      </ListItemButton>
      <ListItemButton sx={{ color: 'black' }} onClick={handleExit}>
        <ListItemIcon sx={{ color: 'black' }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Salir del curso" sx={{ color: 'black' }} />
      </ListItemButton>
    </List>
  );
};
