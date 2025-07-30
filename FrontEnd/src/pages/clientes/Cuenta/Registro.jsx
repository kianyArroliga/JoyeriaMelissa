import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
    useEffect(() => {
        document.title = 'Registro - Melissa Aguilar Joyería';

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

    const [form, setForm] = useState({
        identificacion: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        contrasena: ''  
    });

    const [showPassword, setShowPassword] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,}$/;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');

        console.log('Datos del formulario:', form);
        
        // Verificar que todos los campos estén llenos
        const camposVacios = Object.entries(form).filter(([key, value]) => !value || value.trim() === '');
        if (camposVacios.length > 0) {
            setError('Los siguientes campos están vacíos: ${camposVacios.map(([key]) => key).join(', ')}');
            return;
        }

        if (!passwordRegex.test(form.contrasena)) {
            setError(
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.'
            );
            return;
        }

        if (form.contrasena === 'Clave123@') {
            setError('Esa contraseña es muy común. Por seguridad, escoge una diferente.');
            return;
        }

        try {
            // Preparar datos para enviar - el backend espera 'contraseña' con ñ
            const dataToSend = {
                identificacion: form.identificacion.trim(),
                nombre: form.nombre.trim(),
                apellido: form.apellido.trim(),
                correo: form.correo.trim(),
                telefono: form.telefono.trim(),
                contrasena: form.contrasena  // Enviar con ñ
            };

            console.log('Datos a enviar:', dataToSend);

            const res = await axios.post('http://localhost:4000/api/users/register', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            setMensaje(res.data.mensaje);
            
            // Limpiar formulario después del registro exitoso
            setForm({
                identificacion: '',
                nombre: '',
                apellido: '',
                correo: '',
                telefono: '',
                contrasena: ''
            });
            
        } catch (err) {
            if (err.response) {
                console.log("Error del servidor:", err.response.data);
                setError(err.response.data?.error || 'Error al registrar usuario');
            } else {
                console.log("Error sin respuesta del servidor:", err);
                setError('No se pudo conectar con el servidor');
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-white px-4"
        >
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulario de Registro */}
                <div>
                    <h2 className="text-3xl font-serif font-medium text-[#660022] mb-2">Crear cuenta</h2>
                    <p className="mb-6 text-sm text-grisMelissa">
                        Regístrate para disfrutar de beneficios exclusivos.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="identificacion"
                            placeholder="Identificación"
                            value={form.identificacion}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                        />

                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellidos"
                            value={form.apellido}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                        />
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo"
                            value={form.correo}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                        />
                        <input
                            type="text"
                            name="telefono"
                            placeholder="Teléfono"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-[#CED1C0] focus:outline-none focus:border-[#8C162A] py-2"
                        />

                        {/* Campo contraseña con ícono de visibilidad */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="contrasena"
                                placeholder="Contraseña"
                                value={form.contrasena}
                                onChange={handleChange}
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

                        <p className="text-xs text-gray-500">
                            La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial. Ej: <strong>Clave123@</strong>.
                        </p>

                        <button 
                            type="submit"
                            className="bg-[#8C162A] hover:bg-[#660022] transition-colors text-white px-4 py-2 rounded-md w-full"
                        >
                            Registrarse
                        </button>
                        
                        {mensaje && <p className="text-green-600 font-medium">{mensaje}</p>}
                        {error && <p className="text-red-600 font-medium">{error}</p>}
                    </form>

                    <p className="text-sm text-gray-600 mt-4">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/clientes/login" className="text-[#8C162A] hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>

                {/* Imagen decorativa */}
                <div className="flex items-center justify-center">
                    <img
                        src="/FotosMAJ/FotosMAJ/Anillos/Oro/oro4.jpg"
                        alt="Anillo decorativo"
                        className="rounded-lg shadow-lg max-w-xs"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default Register;