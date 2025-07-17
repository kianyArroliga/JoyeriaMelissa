// src/pages/auth/RestablecerContrasena.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestablecerContrasena = () => {
    const { token } = useParams();
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        // Validar token al cargar
        const validar = async () => {
            try {
                await axios.get(`http://localhost:4000/api/recuperacion/verificar/${token}`);

            } catch {
                setError("El enlace ha expirado o no es válido.");
            }
        };
        validar();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        try {
            const response = await axios.post("http://localhost:4000/api/recuperacion/restablecer", {

                token,
                nuevaContrasena,
            });
            setMensaje(response.data.mensaje);
        } catch (err) {
            setError(err.response?.data?.error || "Error inesperado.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
            <h2 className="text-xl font-bold mb-4">Restablecer contraseña</h2>
            {error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                        className="w-full border p-2 mb-4"
                        required
                    />
                    <button className="w-full bg-green-500 text-white py-2 rounded" type="submit">
                        Cambiar contraseña
                    </button>
                </form>
            )}
            {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
        </div>
    );
};

export default RestablecerContrasena;
