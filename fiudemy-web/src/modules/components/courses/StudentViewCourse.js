import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import AppAppBar from '../../views/AppAppBar';

import { YoutubeEmbed, getEmbeddedYoutubeUrl } from './YoutubeEmbed';
import Checkbox from '@mui/material/Checkbox';
import { getStudentViewedSections, setSectionWiewStatus } from '../../../services/axios_utils';

const wasSectionCompletedByStudent = (section, completedSectionsIds) => (
    completedSectionsIds.includes(section.id)
)

const changeSectionViewStatus = (section, course, completedSectionsIds, setViewedSections) => {
    console.log("section id and completed sections ids", section.id, completedSectionsIds);
    const requestData = {
        "user_id" : localStorage.getItem("userId"),
        "section_id" : section.id,
        "course_id" : course.id

    }
    if (wasSectionCompletedByStudent(section, completedSectionsIds)) {
        setSectionWiewStatus(requestData, false);
        setViewedSections(completedSectionsIds.filter((id) => id !== section.id));


    } else {
        setSectionWiewStatus(requestData, true);
        setViewedSections([...completedSectionsIds, section.id]);
    }
};

export const StudentViewCourse = ({course, setEditMode}) => {
    const [completedSectionsIds, setViewedSections] = useState(null);
    useEffect(() => {
        const fetchViewedSections = async () => {
            try {
                const response = await getStudentViewedSections(localStorage.getItem("userId"), course.id);
                if (response) {
                    setViewedSections(response.results);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchViewedSections();
    }, [course]);

    if (!course || !completedSectionsIds) {
        return <div>Loading...</div>;
    }

    console.log("viewed sections", completedSectionsIds);


    return (
        <>
        <AppAppBar showsSignInOptions={false}/>
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
                {course.active}
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

            <Checkbox value={wasSectionCompletedByStudent(section, completedSectionsIds)} onChange={() => changeSectionViewStatus(section, course, completedSectionsIds, setViewedSections)} /> 

            </div>
          ))}

        </Paper>


        

        </>


    )
}