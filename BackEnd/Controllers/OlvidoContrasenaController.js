const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const OlvidoContrasenaTO = require("../Modelo/OlvidoContrasenaTo");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kianyam25@gmail.com", // ← tu correo real
        pass: "wcfy zjru xlxe uhas", // ← app password si usás 2FA
    },
});

const OlvidoContrasenaController = {
    solicitarRecuperacion: (req, res) => {
        const { correo } = req.body;

        const token = crypto.randomBytes(32).toString("hex");
        const expiracion = new Date(Date.now() + 3600000); // 1 hora

        OlvidoContrasenaTO.guardarToken(correo, token, expiracion, (err, result) => {
            if (err) {
                console.error("Error al guardar el token:", err);
                return res.status(500).json({ error: "Error interno" });
            }

            const link = `http://localhost:5173/clientes/restablecer-contrasena/${token}`;
 // ← ruta frontend

            const mailOptions = {
                from: "kianyam25@gmail.com",
                to: correo,
                subject: "Recuperación de contraseña",
                html: `
            <p>Has solicitado restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para continuar:</p>
            <a href="${link}">${link}</a>
            <p>Este enlace expira en 1 hora.</p>
        `,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error("Error al enviar correo:", err);
                    return res.status(500).json({ error: "No se pudo enviar el correo" });
                }

                res.status(200).json({ mensaje: "Correo de recuperación enviado correctamente" });
            });
        });
    },

    verificarToken: (req, res) => {
        const { token } = req.params;

        OlvidoContrasenaTO.verificarToken(token, (err, resultados) => {
            if (err) {
                console.error("Error al verificar token:", err);
                return res.status(500).json({ error: "Error interno" });
            }

            if (resultados.length === 0) {
                return res.status(400).json({ error: "Token inválido o expirado" });
            }

            res.status(200).json({ mensaje: "Token válido" });
        });
    },

    restablecerContrasena: (req, res) => {
        const { token, nuevaContrasena } = req.body;

        OlvidoContrasenaTO.verificarToken(token, async (err, resultados) => {
            if (err) {
                console.error("Error al verificar token:", err);
                return res.status(500).json({ error: "Error interno" });
            }

            if (resultados.length === 0) {
                return res.status(400).json({ error: "Token inválido o expirado" });
            }

            const correo = resultados[0].correo;
            const hash = await bcrypt.hash(nuevaContrasena, 10);

            OlvidoContrasenaTO.actualizarContrasena(correo, hash, (err2) => {
                if (err2) {
                    console.error("Error al actualizar contraseña:", err2);
                    return res.status(500).json({ error: "Error al actualizar contraseña" });
                }

                res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
            });
        });
    }
};

module.exports = OlvidoContrasenaController;
