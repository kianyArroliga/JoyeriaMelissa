import React, { useState } from 'react';
import axios from 'axios';
import "../css/login.css";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:4000/api/users/login', {
            correo: email,
            contraseña: password
        })


            .then(res => {
                console.log('Respuesta del backend:', res.data);
            })
            .catch(err => {
                console.log('Error al hacer la solicitud:', err);
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