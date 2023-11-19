import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {InputLabel, MenuItem, Select} from "@mui/material";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import {useState} from "react";

function CreateDiscussionModal({ open, onClose, onCreateDiscussion }) {
   const [newDiscussion, setNewDiscussion] = useState({ title: ''});

   return (
      <Modal open={open} onClose={onClose}>
         <Paper sx={{ position: 'absolute', width: 400, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Box sx={{ p: 2 }}>
               <Typography variant="h6" marked={'left'} sx={{ mb: 2 }}>
                  Añadir nueva discusión
               </Typography>
               <TextField
                  label="Título de la discusión"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
                  fullWidth
                  sx={{ mb: 2 }}
               />
               <Button variant="contained" color="primary" onClick={() => {
                  onCreateDiscussion(newDiscussion);
                  onClose();
               }}>
                  Crear discusión
               </Button>
            </Box>
         </Paper>
      </Modal>
   );
}

export default CreateDiscussionModal;