import React, { useEffect, useState } from 'react';
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
import {editCourse, getCourseById} from "../../../services/axios_utils";
import AppAppBar from '../../views/AppAppBar';
import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from "react-router-dom";

function EditCourse() {
    const { courseId } = useParams();
    const [editedCourse, setEditedCourse] = useState(null);
    const [moduleCount, setModuleCount] = useState(0);

    useEffect(() => {
        console.log("entra useffect");
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                if (response) {
                    console.log("]response", response);
                    setEditedCourse(response);
                    setModuleCount(response.sections.length);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [courseId]);
    const navigate = useNavigate();


    if (editedCourse === null) {
        return <div>Loading...</div>;
    }

  



    const handleActivoChange = () => {
        setEditedCourse({
            ...editedCourse,
            active: !editedCourse.active,
        });
    };

    const handleGuardarCambios = async () => {
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
            active: editedCourse.active,
            sections: editedCourse.sections,
        }, courseId);
        navigate("/course");

    }

    const addModule = () => {
        setModuleCount(moduleCount + 1);
      };


    const setSectionValue = (index, key, value) => {
        const newSections = [...editedCourse.sections];
        newSections[index][key] = value;
        setEditedCourse({ ...editedCourse, sections: newSections });
    }
    
    return (
        <>
            <AppAppBar showsSignInOptions={false}/>
            <Paper sx={{ position: 'absolute', width: 900, top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                        Editar curso
                    </Typography>
                    <TextField
                        label="Nombre del curso"
                        value={editedCourse.title}
                        onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Grid item xs={12}>
                        <FormControl sx={{minWidth: '100%'}}>
                        <InputLabel htmlFor="category-select">Categoría</InputLabel>
                        <Select
                            labelId="category-select"
                            value={editedCourse.category}
                            fullWidth
                            defaultValue='otros'
                            sx={{ mb: 2 }}
                            label="Categoría"
                            onChange={(e) => setEditedCourse({ ...editedCourse, category: e.target.value })}
                        >
                            <MenuItem value="fisica">Física</MenuItem>
                            <MenuItem value="matematica">Matemática</MenuItem>
                            <MenuItem value="programacion">Programación</MenuItem>
                            <MenuItem value="literatura">Literatura</MenuItem>
                            <MenuItem value="otros">Otros</MenuItem>
                        </Select>
                        </FormControl>
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
                        <label>
                        <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '18px', color: 'green' }}>
                            ACTIVO:
                        </Typography>
                        <Checkbox
                            name="activo"
                            checked={editedCourse.active}
                            onChange={handleActivoChange}
                            sx={{ width: '25px', height: '25px', color: 'green', '&.Mui-checked': {color: 'green'}}} 
                        />
                        </label>
                        {editedCourse.sections && editedCourse.sections.map((section, index) => (
                        <div key={index}>
                            <Typography variant="h6" marked={'left'}>
                            {section.title}
                            </Typography>
                            <Paper sx={{ p: 2, maxWidth: 350 }}>
                            <TextField label="Titulo de la sección" defaultValue={section.title} sx={{ marginBottom: '10px' }} onChange={(e) => setSectionValue(index, 'title', e.target.value)} />
                            <TextField label="Descripción de la sección" defaultValue={section.description} sx={{ marginBottom: '10px' }} onChange={(e) => setSectionValue(index, 'description', e.target.value)} />
                            <TextField label="Video de la sección" defaultValue={section.video_url} sx={{ marginBottom: '10px' }} onChange={(e) => setSectionValue(index, 'video_url', e.target.value)} />
                           
                            </Paper>
                        </div>
                        ))}
                        {/* <Box sx={{ marginTop: '10px',marginBottom: '30px' }}>
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
                        </Box> */}
                        <Box sx={{ marginTop: '10px', marginBottom: '30px' }}>
                            <Typography variant="h6" marked={'left'}>
                                Añadir nuevo módulo
                            </Typography>
                            <Paper sx={{ p: 2, maxWidth: 350 }}>

                                <Button
                                variant="contained"
                                color="primary"
                                onClick={addModule}
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
       
        </>
    );
}

export default EditCourse;