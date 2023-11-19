import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluations, saveEvaluation, saveEvaluationFile, saveTeacherResponse } from '../../../services/axios_utils';
import AppAppBar from "../../views/AppAppBar";
import Typography from "../Typography";
import NewEvaluationModal from './NewEvaluatioModal';


function StudentAnswer({setEvaluations, answer, evaluationId }) {
  const [feedback, setFeedback] = useState(answer.counter_response ? answer.counter_response : null);

  console.log("student answer", answer);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSaveFeedback = async () => {
    await saveTeacherResponse({
      counter_response: feedback,
    }, evaluationId, answer.user_id);
    setEvaluations((prevEvauations) => {
      const newEvaluations = prevEvauations.map((evaluation) => {
        if (evaluation.id === evaluationId) {
          const newAnswers = evaluation.answers.map((studentAnswer) => {
            if (studentAnswer.user_id === answer.user_id) {
              return {
                ...studentAnswer,
                counter_response: feedback,
              };
            }
            return studentAnswer;
          });
          return {
            ...evaluation,
            answers: newAnswers,
          };
        }
        return evaluation;
      });
      return newEvaluations;

    });


  };

  return (
    <Box sx={{ mb: 2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{answer.student_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography sx={{ fontWeight: 'bold'}}>Respuesta del estudiante </Typography>

        <Typography sx={{ mb:5}} >{answer.answer}</Typography>

          { answer.counter_response ?
            <Typography sx={{ ml:3}}>{answer.counter_response}</Typography>
            : (
              <>
              <TextField
                label="Devolución del profesor"
                value={feedback}
                fullWidth
                multiline
                rows={4}
                onChange={handleFeedbackChange}
                sx={{ mb: 2, ml:3 }}
              />
              <Button variant="contained" color="primary" onClick={handleSaveFeedback}>
                Guardar devolución
              </Button>
          </>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

function EvaluationItem({ evaluationId, title, prompt, answers, evaluations, setEvaluations }) {
 

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box>
          <Typography variant="h6" marked={'left'}>
            {title}
          </Typography>
          <br />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
      < Typography sx={{ mb: 1, fontWeight: 'bold' }}>Descripción de la evaluación</Typography>

        < Typography sx={{ mb: 5, ml:1}}>{prompt}</Typography>
        {
        
        answers.length > 0 ? answers.map((answer, index) => (
          <StudentAnswer
            key={index}
            answer={answer}
            evaluationId={evaluationId}
            evaluations={evaluations}
            setEvaluations={setEvaluations}

          />
        )) : <div>No hay respuestas aún</div>
        }
      </AccordionDetails>
    </Accordion>
  );
}

function EvaluationsView({ evaluations, openModal, setEvaluations }) {

  if(!evaluations){
    return <div>Loading</div>
  }
  return (
    <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
      {evaluations.map((evaluation) => (
        <EvaluationItem
          key={'a'}
          title={evaluation.title}
          prompt={evaluation.question}
          answers={evaluation.answers}
          evaluationId={evaluation.id}
          evaluations={evaluations}
          setEvaluations={setEvaluations}
        />
      ))}
      <Box sx={{ marginTop: '20px' ,textAlign  : 'center'}}>
        <Button variant="contained" color="primary" sx={{ mb: 2 }}>
          Guardar Cambios
        </Button>
        <Button variant="contained" color="primary" sx={{ mb: 2, marginLeft: 2 }} onClick ={openModal}>
          Añadir Evaluación
        </Button>
      </Box>
    </Box>
  );
}

export default function MyEvaluations() {
  const[evaluations,setEvaluations] = useState([])
  const { courseId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
      setIsModalOpen(true);
  };
  const closeModal = () => {
      setIsModalOpen(false);
  };


  const handleAddEvaluation = async (courseId, newEvaluation)=> {
    const res = await (saveEvaluation({
      title : newEvaluation.title,
      question : newEvaluation.question,
      course_id : courseId
    }));
    await (saveEvaluationFile({
      file: newEvaluation.file,
    }, res.id));

  }

  

  useEffect(() => {
    const fetchEvaluations = async () => {
      try{
        const res = await getEvaluations(courseId);
        setEvaluations(res.results)
      }catch(error){
        console.log(error)
      }
    }
    fetchEvaluations()
  }, [courseId]);

  console.log("evaluations", evaluations);
  
  if (!evaluations) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppAppBar showsSignInOptions={false} isProfessor={true} courseId={courseId} />
      <EvaluationsView evaluations={evaluations} openModal={openModal} setEvaluations={setEvaluations}/>
      <NewEvaluationModal
                open={isModalOpen}
                onClose={closeModal}
                onAddEvaluation={handleAddEvaluation}
                courseId = {courseId}
            />
    </>
  );
}
