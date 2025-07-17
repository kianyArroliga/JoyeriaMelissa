// src/pages/auth/SolicitarCorreo.jsx
import React, { useState } from "react";
import axios from "axios";

const SolicitarCorreo = () => {
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");
        setError("");

        try {
            const response = await axios.post("http://localhost:4000/api/recuperacion/solicitar", { correo });

            setMensaje(response.data.mensaje);
        } catch (err) {
            setError(err.response?.data?.error || "Error inesperado.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white">
            <h2 className="text-xl font-bold mb-4">¿Olvidaste tu contraseña?</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    className="w-full border p-2 mb-4"
                    required
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded" type="submit">
                    Enviar enlace
                </button>
            </form>
            {mensaje && <p className="text-green-600 mt-4">{mensaje}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
    );
};

export default SolicitarCorreo;
