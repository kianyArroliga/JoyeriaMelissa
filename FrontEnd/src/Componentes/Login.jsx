import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Enviar los datos de login al backend
        axios.post('http://localhost:3001/api/users/login', { correo: email, contraseña: password })

            .then(res => {
                console.log('Respuesta del backend:', res.data);  // Verifica los datos que devuelve el backend
            })
            .catch(err => {
                console.log('Error al hacer la solicitud:', err);  // Verifica el error en caso de fallo
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;