import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";


function NewModuleModal({ open, onClose, onAddModule, courseId }) {
    const [newModule, setNewModule] = useState({ title: '', description: '', video_url: '' });
    return (
        <Modal open={open} onClose={onClose}>
            <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                        Añadir nuevo módulo
                    </Typography>
                    <TextField
                        label="Nombre del módulo"
                        value={newModule.title}
                        onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Descripción del módulo"
                        value={newModule.description}
                        onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Video del módulo"
                        value={newModule.video_url}
                        onChange={(e) => setNewModule({ ...newModule, video_url: e.target.value })}
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={() => { onAddModule(courseId, newModule); onClose(); }}>
                        Añadir módulo
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
}

export default NewModuleModal;
