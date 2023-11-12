import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppAppBar from "../../views/AppAppBar";
import Typography from "../Typography";

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
          <TextField
            label="Devolución del profesor"
            value={feedback}
            fullWidth
            multiline
            rows={4}
            onChange={handleFeedbackChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSaveFeedback}>
            Guardar devolución
          </Button>
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
    // Puedes guardar la devolución en tu lógica aquí
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
        <TextField
          label="Descripción del curso"
          value={prompt}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        {/* Renderizar las respuestas de los alumnos */}
        {answers.map((answer, index) => (
          <StudentAnswer
            key={index}
            studentName={answer.studentName}
            answer={answer}
            onFeedbackChange={handleFeedbackChange}
            onSaveFeedback={handleSaveFeedback}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

function EvaluationsView({ evaluations }) {
  return (
    <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
      {evaluations.map((evaluation, index) => (
        <EvaluationItem
          key={index}
          title={evaluation.title}
          prompt={evaluation.prompt}
          answers={evaluation.answers}
        />
      ))}
    </Box>
  );
}

export default function MyEvaluations() {
  const { courseId } = useParams();
  console.log(courseId);

  // Simulando datos de evaluaciones
  const evaluationsData = [
    {
      title: "Evaluación 1",
      prompt: "Consigna de la evaluación 1",
      answers: [
        { id: 1, studentName: "Alumno 1", text: "Respuesta 1" },
        { id: 2, studentName: "Alumno 2", text: "Respuesta 2" },
        { id: 3, studentName: "Alumno 3", text: "Respuesta 3" },
      ],
    },
    {
      title: "Evaluación 2",
      prompt: "Consigna de la evaluación 2",
      answers: [
        { id: 4, studentName: "Alumno 4", text: "Respuesta 1" },
        { id: 5, studentName: "Alumno 5", text: "Respuesta 2" },
        { id: 6, studentName: "Alumno 6", text: "Respuesta 3" },
      ],
    },
  ];

  // hacer fetch del curso y sus evaluaciones (puedes agregar tu lógica aquí)

  useEffect(() => {
    // Lógica para hacer fetch del curso y sus evaluaciones
  }, [courseId]);

  return (
    <>
      <AppAppBar showsSignInOptions={false} />
      <EvaluationsView evaluations={evaluationsData} />
    </>
  );
}
