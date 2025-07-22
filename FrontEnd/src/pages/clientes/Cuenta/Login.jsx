import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const navigate = useNavigate(); // Usamos useNavigate para redirigir al perfil después del login exitoso

    useEffect(() => {
        // Cambiar el título de la pestaña
        document.title = 'Iniciar sesión';

        // Agregar favicon dinámicamente
        const link = document.querySelector("link[rel~='icon']");
        if (link) {
            link.href = '/FotosMAJ/Logo/faviconMAJ.ico';
        } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = '/FotosMAJ/Logo/faviconMAJ.ico';
            document.head.appendChild(newLink);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMensaje('');
        setTipoMensaje('');

        axios.post('http://localhost:4000/api/users/clientes/login', {
            correo: email,
            contraseña: password
        })
            .then(res => {
                // Si el login es exitoso, obtenemos el token
                if (res.data.token) {
                    // Guardamos el token JWT en el localStorage
                    localStorage.setItem("authToken", res.data.token);
                    setTipoMensaje('exito');
                    setMensaje('¡Inicio de sesión exitoso!');

                    // Redirigir a la página de perfil
                    navigate("/perfil"); // Usamos navigate para redirigir
                }
            })
            .catch(err => {
                setTipoMensaje('error');
                if (err.response?.status === 401) {
                    setMensaje('Correo o contraseña incorrectos.');
                } else {
                    setMensaje('Ocurrió un error al intentar iniciar sesión.');
                }
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="min-h-screen flex items-center justify-center bg-white px-4"
        >
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario */}
                <div>
                    <h2 className="text-3xl font-serif font-medium text-[#660022] mb-2">Iniciar sesión</h2>
                    <p className="mb-6 text-sm text-grisMelissa">
                        Inicia sesión en tu cuenta de Melissa Joyería.
                    </p>

                    {/* Mensaje visual */}
                    {mensaje && (
                        <div className={`mb-4 p-3 rounded-md text-sm ${
                            tipoMensaje === 'exito'
                                ? 'bg-green-100 text-green-700 border border-green-300'
                                : 'bg-red-100 text-red-700 border border-red-300'
                        }`}>
                            {mensaje}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2 pr-10"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#660022]"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                        <div>
                            <button className="bg-[#8C162A] hover:bg-[#660022] transition-colors text-white px-4 py-2 rounded-md w-full">
                                Iniciar sesión
                            </button>
                        </div>
                        <div className="text-sm text-gray-600">
                            <Link to="/clientes/recuperar-contrasena" className="hover:underline">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Registro */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    className="border-l border-[#8C162A] pl-8"
                >
                    <h2 className="text-3xl font-serif font-medium text-[#660022] mb-2">Crear una cuenta</h2>
                    <p className="text-sm text-grisMelissa mb-6">
                        Ahorra tiempo al pagar, visualiza tu carrito y accede a tu historial de pedidos desde cualquier dispositivo.
                    </p>
                    <Link
                        to="/clientes/registro"
                        className="block w-full bg-[#660022] hover:bg-[#8C162A] text-white text-center py-3 font-medium rounded-md"
                    >
                        Registrarse
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;
