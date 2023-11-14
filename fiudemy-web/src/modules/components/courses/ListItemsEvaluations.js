import AddIcon from '@mui/icons-material/Add';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LogoutIcon from '@mui/icons-material/Logout';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export const NestedListEvaluations = () => {
  const [open, setOpen] = React.useState(true);
  const [evaluations, setEvaluations] = React.useState(['Evaluación 1', 'Evaluación 2', 'Evaluación 3']);
  const [newEvaluationCount, setNewEvaluationCount] = React.useState(1);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/professor-home');
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddEvaluation = () => {
    const newEvaluationName = `Nueva Evaluación${newEvaluationCount > 1 ? ` (${newEvaluationCount})` : ''}`;
    setEvaluations((prevEvaluations) => [...prevEvaluations, newEvaluationName]);
    setNewEvaluationCount((prevCount) => prevCount + 1);
  };

  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <ListItemButton onClick={handleClick} sx={{ color: 'black' }}>
        <ListItemIcon sx={{ color: 'black' }}>
          <DensitySmallIcon />
        </ListItemIcon>
        <ListItemText primary="Evaluaciones" sx={{ color: 'black' }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div">
          {evaluations.map((evaluation, index) => (
            <ListItemButton key={index} sx={{ pl: 4, color: 'black' }}>
              <ListItemIcon sx={{ color: 'black' }}>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={evaluation} sx={{ color: 'black' }} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
      <ListItemButton sx={{ color: 'black' }} onClick={handleAddEvaluation}>
        <ListItemIcon sx={{ color: 'black' }}>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Agregar Evaluación" sx={{ color: 'black' }} />
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
