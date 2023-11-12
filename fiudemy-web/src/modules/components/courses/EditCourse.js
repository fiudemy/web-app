import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { editCourse, getCourseById } from "../../../services/axios_utils";
import AppAppBar from '../../views/AppAppBar';
import NewModuleModal from "./NewModuleModal";

export const ProfessorViewCourse = ({ course, setEditMode }) => {  
    const { courseId } = useParams();
    const navigate = useNavigate();
    return (
      <>
        <AppAppBar showsSignInOptions={false} />
        <Paper
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" marked={'left'}>
              {course.title}
            </Typography>
            <Typography>Descripción:</Typography>
            <Typography>{course.description}</Typography>
            <Typography>Categoría:</Typography>
            <Typography>{course.category}</Typography>
            <Typography>Precio</Typography>
            <Typography>{course.price}</Typography>
            <Typography>Horas</Typography>
            <Typography>{course.hours}</Typography>
            <Typography>Activo</Typography>
            <Typography>{course.active}</Typography>
            <Typography variant="h6" marked={'left'}>
              Módulos
            </Typography>
            {course.sections &&
              course.sections.map((section, index) => (
                <div key={index}>
                  <Typography variant="h6" marked={'left'}>
                    {section.title}
                  </Typography>
                  <Paper sx={{ p: 2, maxWidth: 350 }}>
                    <Typography>Descripción módulo</Typography>
                    <Typography>{section.description}</Typography>
                    <Typography>Video módulo</Typography>
                    <Typography>{section.video_url}</Typography>
                  </Paper>
                </div>
              ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditMode(true);
              }}
            >
              Editar Curso
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                navigate(`/Evaluations/${course.id}`, { state: { course }});
              }}
            >
              Mis Evaluaciones
            </Button>
          </Box>
        </Paper>
      </>
    );
  };
  

export const ViewCourse = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const isProfessor = localStorage.getItem("userRole") === "teacher";
    const [editMode , setEditMode] = useState(false);


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                if (response) {
                    setCourse(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [courseId]);


    if (course === null) {
        return <div>Loading...</div>;
    }

    if (isProfessor) {
        if (course.sections.length === 0 || editMode) {
            return (
                <EditCourse course={course} courseId={courseId} setEditMode={setEditMode}/>
            );
        }
        return (
            <ProfessorViewCourse course={course} setEditMode={setEditMode}/>
        );
    
    }

    
    


}


function EditCourse({course, courseId, setEditMode}) {

    const [editedCourse, setEditedCourse] = useState(course);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openAddModuleModal = () => {
        setIsModalOpen(true);
    };
    const closeAddModuleModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await getCourseById(courseId);
                if (response) {
                    setEditedCourse(response);
                    // setModuleCount(response.sections.length);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [courseId]);


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
        const teacherEmail = localStorage.getItem("email");
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
        setEditMode(false);

    }

    const setSectionValue = (index, key, value) => {
        const newSections = [...editedCourse.sections];
        newSections[index][key] = value;
        setEditedCourse({ ...editedCourse, sections: newSections });
    }

    const handleAgregarModulo = async (courseId, newModule) => {
        console.log("new module is ", newModule);   
        editedCourse.sections.push(newModule);
    }
    
    const removeSection = (index) => {
        setEditedCourse({
          ...editedCourse,
          sections: editedCourse.sections.filter((_, i) => i !== index),
        });
      };
    
    return (
        <>
            <AppAppBar showsSignInOptions={false}/>
            <Paper sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', padding: '20px' }}>                
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
                           
                            <Button
                            color="secondary"
                            onClick={() => removeSection(index)}
                            style={{
                                marginTop: '30px',
                                marginLeft : '10px',
                            }}
                            >
                            <DeleteIcon />
                            </Button>
                            </Paper>

                            

                            
                        </div>
                        ))}
                        <Box sx={{ marginTop: '10px', marginBottom: '30px' }}>
                            <Typography variant="h6" marked={'left'}>
                                Añadir nuevo módulo
                            </Typography>
                            <Paper sx={{ p: 2, maxWidth: 350 }}>

                                <Button
                                variant="contained"
                                color="primary"
                                onClick={openAddModuleModal}
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
                onClose={closeAddModuleModal}
                onAddModule={handleAgregarModulo}
                courseId = {courseId}
            />
       
        </>
    );
}

export default EditCourse;