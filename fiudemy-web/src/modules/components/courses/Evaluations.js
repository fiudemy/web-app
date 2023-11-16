import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvaluations, saveEvaluation } from '../../../services/axios_utils';
import AppAppBar from "../../views/AppAppBar";
import Typography from "../Typography";
import NewEvaluationModal from './NewEvaluatioModal';


function StudentAnswer({ studentName, answer, onFeedbackChange, onSaveFeedback }) {
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
    onFeedbackChange(answer.id, event.target.value);
  };

  const handleSaveFeedback = () => {
    onSaveFeedback(answer.id, feedback);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{studentName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography>{answer.text}</Typography>

          { answer.counterresponse ?
            <Typography sx={{ ml:3}}>{answer.counterresponse}</Typography>
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

function EvaluationItem({ title, prompt, answers }) {
  const [feedbackMap, setFeedbackMap] = useState({});

  const handleFeedbackChange = (answerId, feedback) => {
    setFeedbackMap((prevFeedbackMap) => ({
      ...prevFeedbackMap,
      [answerId]: feedback,
    }));
  };

  const handleSaveFeedback = (answerId, feedback) => {
    console.log(`Guardando devolución para respuesta ${answerId}: ${feedback}`);
  };

 

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
        
        answers? answers.map((answer, index) => (
          <StudentAnswer
            key={index}
            studentName={answer.studentName}
            answer={answer}
            onFeedbackChange={handleFeedbackChange}
            onSaveFeedback={handleSaveFeedback}
          />
        )) : <div>No hay respuestas aún</div>
        }
      </AccordionDetails>
    </Accordion>
  );
}

function EvaluationsView({ evaluations, openModal}) {

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
    console.log("new module is ", newEvaluation);   
    await (saveEvaluation({
      title : newEvaluation.title,
      question : newEvaluation.question,
      course_id : courseId
    }))

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
  
  if (!evaluations) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <AppAppBar showsSignInOptions={false} />
      <EvaluationsView evaluations={evaluations} openModal={openModal} />
      <NewEvaluationModal
                open={isModalOpen}
                onClose={closeModal}
                onAddEvaluation={handleAddEvaluation}
                courseId = {courseId}
            />
    </>
  );
}