const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routers/usuarioRouter');

const app = express();

const allowedOrigins = [
    'http://localhost:5173',  
    'https://joyeriamelissa-1.onrender.com'
];

app.use(cors({
    origin: (origin, callback) => {
    
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));


app.use(express.json());


app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
    res.send('Backend funcionando correctamente');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend corriendo en el puerto ${PORT}`);
});
