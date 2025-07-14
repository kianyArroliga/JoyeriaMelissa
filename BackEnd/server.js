const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routers/usuarioRouter');
const categoriaRouter = require('./Routers/categoriaRouter');   
const materialRouter = require('./Routers/materialRouter');
const piedraRouter = require('./Routers/piedraRouter');
const productoRouter = require('./Routers/productoRouter');
const tallaRouter = require('./Routers/tallaRouter');
const ProductoTallaController = require('./Routers/productoTallaRouter');

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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));


app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/categorias', categoriaRouter);
app.use('/api/materiales', materialRouter);
app.use('/api/piedras', piedraRouter);
app.use('/api/productos', productoRouter);
app.use('/api/tallas', tallaRouter);
app.use('/api/producto-talla', ProductoTallaController);


app.get('/', (req, res) => {
    res.send('Backend funcionando correctamente');
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend corriendo en el puerto ${PORT}`);
});
