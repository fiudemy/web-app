/*import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignIn({ route }) { // Añadimos una prop llamada 'route'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        console.log("login in")
        navigate(route); // Usamos la prop 'route' en lugar de '/student-home'
    };

    return (
        <div style={{ background: '#fff', width: '%100', display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '10px', width: '500px', fontFamily: 'sans-serif', marginBottom: '10px' }}>
                <div style={{ borderLeft: 'none', float: 'none', padding: '0% 10%', width: '100%' }}>
                    <label style={{ color: '#000' }}>Usuario</label>
                    <TextField
                        type="text"
                        variant="standard"
                        inputProps={{
                            style: { color: '#555555', fontWeight: 300, fontSize: '120%' },
                        }}
                        value={username}
                        onChange={handleUsernameChange}
                        fullWidth
                    />
                    <label style={{ color: '#000' }}>Contraseña</label>
                    <TextField
                        type="password"
                        variant="standard"
                        value={password}
                        onChange={handlePasswordChange}
                        fullWidth
                    />
                    <button
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0 20px',
                            width: '100%',
                            height: '50px',
                            backgroundColor: '#fd628a',
                            borderRadius: '25px',
                            transition: 'all 0.4s',
                            border: '0px',
                            marginTop: '20px',
                            cursor: 'pointer',
                        }}
                        onClick={handleSubmit}
                        title='LOGIN'
                    >
                        <div style={{
                            fontFamily: 'sans-serif',
                            fontWeight: '900',
                            fontSize: '16px',
                            color: '#fff',
                            lineHeight: '1.2',
                            textTransform: 'uppercase'
                        }}>
                            Iniciar sesión
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
*/