import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";

function EditCourse() {
    const location = useLocation();
    const originalCourseData = location.state.course;
    const [editedCourse, setEditedCourse] = useState({
        name: originalCourseData.title,
        description: originalCourseData.description,
        category : originalCourseData.category,
        price :  originalCourseData.price, //Que el precio y las horas vengan curso
        hours : originalCourseData.hours,
        active: originalCourseData.active,
    });
    console.log(originalCourseData);
    // Manejar cambios en los atributos del curso

    // Manejar cambios en el estado activo del curso
    const handleActivoChange = () => {
        setEditedCourse({
            ...editedCourse,
            active: !editedCourse.active,
        });
    };

    // Manejar guardar cambios
    const handleGuardarCambios = () => {
        // En esta función, puedes enviar los datos del curso al servidor o hacer cualquier otra acción necesaria.
        // Por ahora, simplemente mostraremos los datos en la consola.
        console.log(editedCourse);
    };

    return (
        <div>
            <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                        Editar curso
                    </Typography>
                    <TextField
                        label="Nombre del curso"
                        value={editedCourse.name}
                        onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Grid item xs={12}>
                        <InputLabel htmlFor="category-select">Categoría</InputLabel>
                        <Select
                            labelId="category-select"
                            value={editedCourse.category}
                            fullWidth
                            defaultValue='otros'
                            sx={{ mb: 2 }}
                            onChange={(e) => setEditedCourse({ ...editedCourse, category: e.target.value })}
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
                        value={editedCourse.price}
                        onChange={(e) => setEditedCourse({ ...editedCourse, price: e.target.value })}
                        fullWidth
                        rows={1}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Horas"
                        value={editedCourse.hours}
                        onChange={(e) => setEditedCourse({ ...editedCourse, hours: e.target.value })}
                        fullWidth
                        rows={1}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Descripción del curso"
                        value={editedCourse.description}
                        onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <label>Activo:
                        <input
                            type="checkbox"
                            name="activo"
                            checked={editedCourse.active}
                            onChange={handleActivoChange}
                        />
                    </label>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => { handleGuardarCambios(); }}>
                            Guardar Cambios
                        </Button>
                    </div>
                </Box>
            </Paper>

        </div>
    );
}

export default EditCourse;