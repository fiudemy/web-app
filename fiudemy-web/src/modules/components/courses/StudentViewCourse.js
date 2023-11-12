import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import AppAppBar from '../../views/AppAppBar';

import { YoutubeEmbed, getEmbeddedYoutubeUrl } from './YoutubeEmbed';
import { CheckBox } from '@mui/icons-material';
import { getStudentViewedSections, setSectionWiewStatus } from '../../../services/axios_utils';

const wasSectionCompletedByStudent = (section, completedSectionsIds) => (
    completedSectionsIds.includes(section.id)
)

const changeSectionViewStatus = (section, course, completedSectionsIds) => {
    const requestData = {
        "user_id" : localStorage.getItem("userId"),
        "section_id" : section.id,
        "course_id" : course.id

    }
    if (wasSectionCompletedByStudent(section, completedSectionsIds)) {
        setSectionWiewStatus(requestData, false);

        return false;
    } else {
        setSectionWiewStatus(requestData, true);
        return true;
    }
};

export const StudentViewCourse = ({course, setEditMode}) => {
    //load the viewr of the course, wiht title description and rest of fields
    const [viewedSections, setViewedSections] = useState(null);
    useEffect(() => {
        const fetchViewedSections = async () => {
            try {
                const response = await getStudentViewedSections(localStorage.getItem("userId"), course.id);
                if (response) {
                    setViewedSections(response);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchViewedSections();
    }, [course.id]);

    return (
        <>
        <AppAppBar showsSignInOptions={false}/>
        <Paper sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', padding: '20px' }}>                
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" marked={'left'}>
                {course.title}
            </Typography>
            <Typography >Descripción:</Typography>
            <Typography >{course.description}</Typography>
            <Typography >Categoría:</Typography>
            <Typography >{course.category}</Typography>
            <Typography >Precio</Typography>
            <Typography >{course.price}</Typography>
            <Typography >Horas</Typography>
            <Typography >{course.hours}</Typography>
            <Typography >Activo</Typography>
            <Typography >{course.active}</Typography>
            <Typography variant="h6" marked={'left'}>
                Modulos
            </Typography>
            {course.sections && course.sections.map((section, index) => (
                <div key={index}>
                    <Typography variant="h6" marked={'left'}>
                    {section.title}
                    </Typography>
                    <Paper sx={{ p: 2, maxWidth: 350 }}>
                    <Typography >Descripción modulo</Typography>
                    <Typography >{section.description}</Typography>
                    <Typography >Video modulo</Typography>
                    {
                        getEmbeddedYoutubeUrl(section.video_url) === null ?
                        <Typography >{"Url de video invalido"}</Typography> :
                    <YoutubeEmbed url={getEmbeddedYoutubeUrl(section.video_url)} />
                    }
                    <CheckBox value={wasSectionCompletedByStudent(section, viewedSections)} onChange={(section, course) => changeSectionViewStatus(section, course, viewedSections)} /> 
                    </Paper>
                </div>
            ))}
            <Button variant="contained" color="primary" onClick={() => { setEditMode(true) }}>
                Editar Curso
                
            </Button>
        </Box>
        </Paper>

        

        </>


    )
}