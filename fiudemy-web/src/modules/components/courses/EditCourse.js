import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import NewModuleModal from "./NewModuleModal";
import {editCourse, getCourseById} from "../../../services/axios_utils";
import AppAppBar from '../../views/AppAppBar';
import { FormControl } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import { YoutubeEmbed, getEmbeddedYoutubeUrl } from './YoutubeEmbed';
import { StudentViewCourse } from './StudentViewCourse';



export const ProfessorViewCourse = ({course, setEditMode}) => {
    //load the viewr of the course, wiht title description and rest of fields
    const navigate = useNavigate();

    return (
        <>
        <AppAppBar showsSignInOptions={false} courseId={course.id} isProfessor={true} />
        {/* Main content */}
      <Paper
        sx={{ padding: 3, border: '2px solid #e0e0e0', borderRadius: 12, m: 3, p:5 }}
      >
        {/* Course Title and Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
          {/* Course Logo */}
          {/* <img src={course.logo} alt="Course Logo" style={{ marginRight: 10, width: 60, height: 60 }} /> */}

          {/* Course Title */}
          <Typography variant="h4" component="div">
            {course.title}
          </Typography>
        </Box>

        {/* Course Details */}
        <Box
        sx={{
            '& > :not(style) + :not(style)': {
            marginTop: '8px', // Add margin to separate each pair of Typography components
            },
        }}
        >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Descripción:
            </Typography>
            <Typography sx={{ paddingBottom: '8px' }}>
                {course.description}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Categoría:
            </Typography>
            <Typography variant="body2" sx={{ paddingBottom: '8px' }}>
                {course.category}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Precio:
            </Typography>
            <Typography variant="body2" sx={{ paddingBottom: '8px' }}>
                {course.price}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Horas:
            </Typography>
            <Typography variant="body2" sx={{ paddingBottom: '8px' }}>
                {course.hours}
            </Typography>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Activo:
            </Typography>
            <Typography variant="body2" sx={{ paddingBottom: '8px' }}>
                {course.active ? "Si" : "No"}

        </Typography>
        </Box>
        </Paper>
        <Paper
        sx={{ padding: 3, border: '2px solid #e0e0e0', borderRadius: 12, m: 3, p: 5 }}
      >
        {course.sections &&
          course.sections.map((section, index) => (
            <div key={index} style={{ marginBottom: 80 }}>
              <Typography variant="h4" marked="left" sx={{ borderBottom: '2px solid #e0e0e0', paddingBottom: 1, marginBottom: 3 }}>
                {section.title}
              </Typography>
              <Box
                elevation={3} // Add shadow
                sx={{ padding: 2, maxWidth: "80 %", marginBottom: 5, '& > :not(style) + :not(style)': {
                    marginTop: '8px', // Add margin to separate each pair of Typography components
                    } }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Descripción del módulo:</Typography>
                <Typography variant="body2" paragraph>
                  {section.description}
                </Typography>
                
                {getEmbeddedYoutubeUrl(section.video_url) === null ? (
                  <Typography variant="body2">Url de video inválido</Typography>
                ) : (
                    <Box sx={{ marginTop: 3, marginBottom: 3 }}>
                  <YoutubeEmbed url={getEmbeddedYoutubeUrl(section.video_url)} />
                    </Box>
                )}
              </Box>
            </div>
          ))}

        {/* Edit Button */}
        <Box className='d-flex align-items-center'>
        <Button variant="contained" color="primary" onClick={() => setEditMode(true)} sx={{ marginTop: 3, marginRight: 3 }}>
          Editar Curso
        </Button>

         <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate(`/evaluations/${course.id}`, { state: { course }});
          }}
          sx={{ marginTop: 3 }}
        >
          Mis Evaluaciones
        </Button>
        </Box>
        </Paper>
        

        </>


    )
}

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
    else {
        return (
            <StudentViewCourse course={course}/>
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
            <AppAppBar showsSignInOptions={false} courseId={courseId} isProfessor={true} />
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

                    <div className='d-flex justify-content-center'>
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