import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

import Button from "@mui/material/Button";
import { CircularProgress, DialogContent, Input } from "@mui/material";



function NewEvaluationModal({ open, onClose, onAddEvaluation, courseId }) {
    const [newEvaluation, setNewEvaluation] = useState({ title: '', question: ''});
    const [isUploading, setUploading] = useState(false);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          setUploading(true);
          try {
            setNewEvaluation({ ...newEvaluation, file: selectedFile });
          } catch (error) {
            console.error('Error updating profile picture:', error);
          } finally {
            setUploading(false);
          }
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                        Añadir nueva evaluacion
                    </Typography>
                    <TextField
                        label="Nombre de la Evaluación"
                        value={newEvaluation.title}
                        onChange={(e) => setNewEvaluation({ ...newEvaluation, title: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Pregunta"
                        value={newEvaluation.question}
                        onChange={(e) => setNewEvaluation({ ...newEvaluation, question: e.target.value })}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <DialogContent>
                    <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e)}
                        disabled={isUploading}
                    />
                    {isUploading && <CircularProgress />}
                    </DialogContent>

                    <Button variant="contained" color="primary" onClick={() => { onAddEvaluation(courseId, newEvaluation); onClose(); }} disabled={isUploading}>
                        Añadir evaluacion
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
}

export default NewEvaluationModal;
