import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

function CourseModal({ open, onClose, onAddCourse, newCourse, setNewCourse }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
            Añadir nuevo curso
          </Typography>
          <TextField
            label="Nombre del curso"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Descripción del curso"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={() => { onAddCourse(); onClose(); }}>
            Añadir curso
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default CourseModal;
