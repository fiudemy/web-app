import React, {useState} from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";


function NewModuleModal({ open, onClose, onAddModule, newModule, setNewModule }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };


    return (
        <Modal open={open} onClose={onClose}>
            <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                        Añadir nuevo módulo
                    </Typography>
                    <TextField
                        label="Nombre del módulo"
                        value={newModule.name}
                        onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <InputLabel htmlFor="category-select">Añadir imagen con contenido</InputLabel>
                    <Input
                        type="file"
                        onChange={handleImageChange}
                        sx={{ mb: 2 }}
                    />
                    <Grid/>
                    <Button variant="contained" color="primary" onClick={() => { onAddModule(); onClose(); }}>
                        Añadir módulo
                    </Button>
                </Box>
            </Paper>
        </Modal>
    );
}

export default NewModuleModal;
