import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "../Typography";
import { CourseToolBar } from "./CourseToolBar";
function EvaluationBar(){
    return(<></>)
}

export default function MyEvaluations(){
    const {courseId} = useParams();
    console.log(courseId)
    // hacer fetch del curso y sus evaluaciones
    useEffect(()=>{});
    return(
    <>
        <CourseToolBar isEvaluation = {true}/>
        <Box sx={{ marginBottom: '200px', marginTop: '30px' }}>
        <Typography variant="h6" marked={'left'} sx={{ mt: 2, ml: 3 }}>
            Nombre Evaluación
        </Typography>
        </Box>
    
    </>);

}