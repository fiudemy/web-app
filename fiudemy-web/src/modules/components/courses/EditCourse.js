import React, { useState } from 'react';
import {useLocation, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewModuleModal from "./NewModuleModal";
import {createCourse, editCourse} from "../../../services/axios_utils";
import AppAppBar from '../../views/AppAppBar';

function EditCourse() {
    const location = useLocation();
    const { courseId } = useParams();
    const originalCourseData = location.state.course;
    const [editedCourse, setEditedCourse] = useState({
        name: originalCourseData.title,
        description: originalCourseData.description,
        category : originalCourseData.category,
        price :  originalCourseData.price, //Que el precio y las horas vengan curso
        hours : originalCourseData.hours,
        active: originalCourseData.active,
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newModule, setNewModule] = useState({ name: ''});
    console.log(originalCourseData);

    const handleActivoChange = () => {
        setEditedCourse({
            ...editedCourse,
            active: !editedCourse.active,
        });
    };

    const handleGuardarCambios = () => {
        console.log(editedCourse);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAgregarModulo = async () => {
        console.log(courseId);
        const teacherEmail = localStorage.getItem("email");
        console.log(editedCourse);
        await editCourse({
            title: editedCourse.name,
            description: editedCourse.description,
            teacher: teacherEmail,
            category: editedCourse.category,
            price: editedCourse.price,
            hours: editedCourse.hours,
            active: editedCourse.active
        }, courseId);
    }

    return (
        <div>
            <AppAppBar showsSignInOptions={false}/>
            <Paper sx={{ position: 'absolute', width: 900, top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
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
                        <Box sx={{ marginBottom: '30px', ml: 3 }}>
                            <Typography variant="h6" marked={'left'}>
                                Añadir nuevo módulo
                            </Typography>
                            <Paper sx={{ p: 2, maxWidth: 350 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={openModal}
                                    style={{
                                        borderRadius: '50%',
                                        width: '50px',
                                        height: '50px',
                                        minWidth: 0,
                                        padding: 0,
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                            </Paper>
                        </Box>
                    <div>
                        <Button variant="contained" color="primary" onClick={() => { handleGuardarCambios(); }}>
                            Guardar Cambios
                        </Button>
                    </div>
                </Box>
            </Paper>
            <NewModuleModal
                open={isModalOpen}
                onClose={closeModal}
                onAddModule={handleAgregarModulo}
                newModule={newModule}
                setNewModule={setNewModule}
            />
        </div>
    );
}

export default EditCourse;