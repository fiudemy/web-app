import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from 'react';
import { getEvaluations, getEvaluationsByUserId, saveStudentAnswer } from "../../../services/axios_utils";

import { Button, TextField } from "@mui/material";
import AppAppBar from '../../views/AppAppBar';

import Checkbox from '@mui/material/Checkbox';
import { getStudentViewedSections, setSectionWiewStatus } from '../../../services/axios_utils';
import { YoutubeEmbed, getEmbeddedYoutubeUrl } from './YoutubeEmbed';

const wasSectionCompletedByStudent = (section, completedSectionsIds) => {

    return completedSectionsIds.includes(section.id)
};

const changeSectionViewStatus = (section, course, completedSectionsIds, setViewedSections) => {
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

export const getStudentResponseFromEvaluation = (evaluation) => {
   
    const res = evaluation.answer
    if (!res) {
        return "Agrega una respuesta para la evaluacion!";
    }
    return res;
}

export const getTeacherResponseFromEvaluation = (evaluation) => {
    const userID = localStorage.getItem('userId');
    if (!evaluation.responses) {
      return "El profesor no ha respondido aún";
    }
    const res = evaluation.responses.find((response) => response.user_id === userID);
    if (!res.counterresponse) {
        return "El profesor no ha respondido aún";
    }
    return res.counterresponse;
}

export const StudentViewCourse = ({course, setEditMode}) => {
    const [answer, setAnswer] = useState({});
    const [completedSectionsIds, setViewedSections] = useState(null);
    const[evaluations,setEvaluations] = useState([]);
    const courseSectionQuantity = course.sections.length;

    const handleEnviar = (evaluationId) => {
        const res = answer[evaluationId];
        const userID = localStorage.getItem('userId');
        saveStudentAnswer({
          user_id: userID,
          answer: res,
        }, evaluationId);
        //add answer to evaluation
        setEvaluations((prevEvaluations) => {
          const newEvaluations = prevEvaluations.map((evaluation) => {
            if (evaluation.id === evaluationId) {
              return {
                ...evaluation,
                answer: res,
              };
            }
            return evaluation;
          });
          return newEvaluations;
        }
        );



    }

    const handleAnswerChange = (evaluationId, value) => {
        setAnswer((prevRespuestas) => ({
          ...prevRespuestas,
          [evaluationId]: value,
        }));
      };
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

    useEffect(() => {
        const fetchEvaluations = async () => {
          try{
            const res = await getEvaluationsByUserId(course.id, localStorage.getItem("userId"))
            setEvaluations(res.results)
          }catch(error){
            console.log(error)
          }
        }
        fetchEvaluations()
      }, [course.id]);


    if (!course || !completedSectionsIds || !evaluations) {
        return <div>Loading...</div>;
    }

    

    return (
        <>
        <AppAppBar showsSignInOptions={false} isStudent={true} />
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
            <Typography sx={{ marginBottom: 5  }}>
                {course.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>

                <Box sx={{ marginRight: 5 }}>

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

                </Box>

                <Box >

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

            </Box>

            {/* create a mui progress bar based on courseSectionQuantity ant the viewed sections length */}
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Progreso
          </Typography>
       
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
            <progress value={completedSectionsIds.length} max={courseSectionQuantity}  sx={{ marginRight: 4, width: 60, height: 60 }} />
            <Box>
            <Typography  component="div" sx={{ marginLeft: 2}}>
                {Math.round((completedSectionsIds.length / courseSectionQuantity) * 100)}%
                </Typography>

            </Box>
        </Box>
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

            <Checkbox checked={wasSectionCompletedByStudent(section, completedSectionsIds)} onChange={() => changeSectionViewStatus(section, course, completedSectionsIds, setViewedSections)} /> 

            </div>
          ))}

        </Paper>

        <Paper
        sx={{ padding: 3, border: '2px solid #e0e0e0', borderRadius: 12, m: 3, p: 5 }}
        > 
        {evaluations &&
          evaluations.map((evaluation) => (
            <div key={evaluation.title} style={{ marginBottom: 80 }}>
              <Typography variant="h5" marked="left" sx={{ borderBottom: '2px solid #e0e0e0', paddingBottom: 1, marginBottom: 3 }}>
                {evaluation.title}
              </Typography>
              <Box
                elevation={3} // Add shadow
                sx={{ padding: 2, maxWidth: "80 %", marginBottom: 5, '& > :not(style) + :not(style)': {
                    marginTop: '8px', // Add margin to separate each pair of Typography components
                    } }}
              >
                <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Consigna de la Evaluacion:</Typography>
                <Typography variant="body2" paragraph>
                  {evaluation.question}
                </Typography>
                <Box sx={{ marginTop: 3, marginBottom: 3, marginLeft: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 3,}}>Respuesta del Estudiante:</Typography>

                { evaluation.answer ? (
                  <Typography variant="body2" paragraph>
                    {getStudentResponseFromEvaluation(evaluation)}
                  </Typography>
                ) : (
                  <>
                  <TextField
                      label="Respuesta"
                      value = {answer[evaluation.id] || ''}
                      onChange={(e) => handleAnswerChange(evaluation.id, e.target.value)}
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ mb: 2 }}
                      />
                  <Button variant="contained" color="primary" onClick={() => handleEnviar(evaluation.id)}>
                      Enviar
                  </Button>
                  </>
                )}
                </Box>

                { evaluation.answer ? (


                <Box sx={{ marginTop: 3, marginBottom: 3, marginLeft: 5 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold'}}>Respuesta del Profesor:</Typography>
                  <Typography variant="body2" paragraph>
                    {getTeacherResponseFromEvaluation(evaluation)}
                  </Typography>
                </Box>
                ) : (
                  null
                )}               

              </Box>



            </div>
            ))}

        </Paper>
        

        </>


    )
}