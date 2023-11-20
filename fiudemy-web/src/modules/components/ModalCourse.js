import { InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

function CourseModal({ open, onClose, onAddCourse, newCourse, setNewCourse }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
            Añadir nuevo curso
          </Typography>
          <TextField
            label="Nombre del curso"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Grid item xs={12}>
            <InputLabel htmlFor="category-select">Categoría</InputLabel>
            <Select
              labelId="category-select"
              value={newCourse.category}
              fullWidth
              defaultValue='otros'
              sx={{ mb: 2 }}
              onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
            >
              <MenuItem value="fisica">Física</MenuItem>
              <MenuItem value="matematica">Matemática</MenuItem>
              <MenuItem value="programacion">Programación</MenuItem>
              <MenuItem value="literatura">Literatura</MenuItem>
              <MenuItem value="otros">Otros</MenuItem>
            </Select>
          </Grid>
          <TextField
            label="Precio"
            value={newCourse.price}
            onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            fullWidth
            rows={1}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Horas"
            value={newCourse.hours}
            onChange={(e) => setNewCourse({ ...newCourse, hours: e.target.value })}
            fullWidth
            rows={1}
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
          <Grid item xs={12}></Grid>
            <InputLabel htmlFor="category-select">Añadir imagen</InputLabel>
            <Input
              type="file"
              onChange={handleImageChange}
              sx={{ mb: 2 }}
            />
          <Grid/>
          <Button variant="contained" color="primary" onClick={() => { onAddCourse(); onClose(); }}>
            Añadir curso
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}

export default CourseModal;
