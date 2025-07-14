const ProductoTo = require('../Modelo/ProductoTo');
const ProductoTallaTo = require('../Modelo/ProductoTallaTo');
const cloudinary = require('../Config/cloudinary');
const fs = require('fs');

const ProductoController = {

   agregarProducto: async (req, res) => {
    const { nombre, estado, precio, idCategoria, idPiedra, idMaterial, descripcion, tallas, stock } = req.body;

    if (!nombre || nombre.trim() === '' ||
        !descripcion || descripcion.trim() === '' ||
        !precio || isNaN(precio) ||
        !idCategoria || !idPiedra || !idMaterial) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y deben ser válidos' });
    }

    if (!req.file) {
        return res.status(400).json({ error: 'No se ha proporcionado una imagen' });
    }

    try {
        // Subir imagen a Cloudinary
        const resultado = await cloudinary.uploader.upload(req.file.path, {
            folder: 'joyeria_productos'
        });

        const nuevoProducto = {
            nombre: nombre.trim(),
            estado: parseInt(estado, 10) === 1 ? 1 : 0, // ✅ Forzar a número
            precio,
            image_url: resultado.secure_url,
            idCategoria,
            idPiedra,
            idMaterial,
            descripcion: descripcion.trim()
        };

        ProductoTo.registrar(nuevoProducto, (err, result) => {
            if (err) {
                console.error('Error al registrar producto:', err);
                return res.status(500).json({ error: 'Error al registrar producto' });
            }

            const idProducto = result.insertId;
            const categoriaEsAnillos = parseInt(idCategoria, 10) === 1;

            // 📦 Preparar datos para la tabla intermedia
            let tallasFinal = [];
            if (categoriaEsAnillos) {
                const tallasParsed = JSON.parse(tallas || '[]');
                if (Array.isArray(tallasParsed) && tallasParsed.length > 0) {
                    tallasFinal = tallasParsed;
                } else {
                    console.warn(`⚠️ Producto registrado sin tallas (ID: ${idProducto})`);
                    fs.unlinkSync(req.file.path);
                    return res.status(400).json({ error: 'Debes registrar al menos una talla para Anillos' });
                }
            } else {
                tallasFinal = [{ idTalla: null, stock: parseInt(stock, 10) || 0 }];
            }

            ProductoTallaTo.registrarTallas(idProducto, tallasFinal, (errTallas) => {
                fs.unlinkSync(req.file.path); // Borra la imagen temporal
                if (errTallas) {
                    console.error('❌ Error al registrar tallas/stock:', errTallas);
                    return res.status(500).json({ error: 'Error al registrar tallas/stock' });
                }

                console.log(`✅ Producto y tallas/stock registrados correctamente (ID: ${idProducto})`);
                return res.status(201).json({
                    mensaje: 'Producto y tallas/stock registrados correctamente',
                    id: idProducto,
                });
            });
        });
    } catch (error) {
        console.error('❌ Error al subir imagen:', error);
        return res.status(500).json({ error: 'Error al subir la imagen' });
    }
},


    // Listar productos activos (cliente)
    listarActivos: (req, res) => {
        ProductoTo.obtenerActivos((err, productos) => {
            if (err) {
                console.error('Error al obtener productos activos:', err);
                return res.status(500).json({ error: 'Error al obtener productos activos' });
            }
            res.status(200).json(productos);
        })
    },

    // Listar todos los productos (admin)
    listarTodos: (req, res) => {
        ProductoTo.obtenerTodos((err, productos) => {
            if (err) {
                console.error('Error al obtener todos los productos:', err);
                return res.status(500).json({ error: 'Error al obtener todos los productos' });
            }
            res.status(200).json(productos);
        })
    },

    obtenerProductoPorId: (req, res) => {
        const idProducto = req.params.idProducto;

        ProductoTo.obtenerPorId(idProducto, (err, producto) => {
            if (err) {
                console.error("Error al buscar producto:", err);
                return res.status(500).json({ error: "Error al buscar el producto" });
            }

            if (!producto) {
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            res.status(200).json(producto); //Producto encontrado
        });
    },

    eliminarProducto: (req, res) => {
        const { idProducto } = req.params
        ProductoTo.eliminar(idProducto, (err, result) => {
            if (err) {
                console.error('Error al eliminar producto:', err);
                return res.status(500).json({ error: 'Error al eliminar producto' });
            }
            res.status(200).json({ mensaje: 'Producto  y tallas eliminado exitosamente' });
        })
    },

   editarProducto: async (req, res) => {
    try {
        const { idProducto } = req.params;
        const { nombre, estado, precio, idCategoria, idPiedra, idMaterial, descripcion, tallas, stock } = req.body;

        console.log("Datos recibidos en el body:", req.body);
        console.log("Imagen recibida:", req.file);

        ProductoTo.obtenerPorId(idProducto, async (err, productoExistente) => {
            if (err) {
                console.error("Error al buscar el producto:", err);
                return res.status(500).json({ error: "Error al buscar el producto" });
            }

            if (!productoExistente) {
                console.warn(`Producto con ID ${idProducto} no encontrado`);
                return res.status(404).json({ error: "Producto no encontrado" });
            }

            let nuevaImagen = productoExistente.image_url;
            if (req.file) {
                try {
                    const result = await cloudinary.uploader.upload(req.file.path);
                    nuevaImagen = result.secure_url;
                    fs.unlinkSync(req.file.path);
                } catch (imgError) {
                    console.error("Error al subir imagen a Cloudinary:", imgError);
                    return res.status(500).json({ error: "Error al subir la imagen" });
                }
            }

            const productoActualizado = {
                nombre: nombre || productoExistente.nombre,
                estado: parseInt(estado, 10) === 1 ? 1 : 0, // ✅ Forzar a número
                image_url: nuevaImagen,
                precio,
                idCategoria,
                idPiedra,
                idMaterial,
                descripcion,
                stock: parseInt(stock, 10) || 0 // ✅ Forzar stock a número
            };

            ProductoTo.actualizar(idProducto, productoActualizado, (err) => {
                if (err) {
                    console.error("Error al actualizar producto:", err);
                    return res.status(500).json({ error: "Error al actualizar el producto" });
                }

                const categoriaEsAnillos = parseInt(idCategoria, 10) === 1;

                let tallasFinal = [];
                if (categoriaEsAnillos) {
                    const tallasParsed = JSON.parse(tallas || '[]');
                    if (Array.isArray(tallasParsed) && tallasParsed.length > 0) {
                        tallasFinal = tallasParsed;
                    } else {
                        console.warn(`⚠️ No se enviaron tallas para Anillos (ID: ${idProducto})`);
                        return res.status(400).json({ error: "Debes proporcionar al menos una talla" });
                    }
                } else {
                    tallasFinal = [{ idTalla: null, stock: parseInt(stock, 10) || 0 }];
                }

                ProductoTallaTo.actualizarTallas(idProducto, tallasFinal, (errTallas) => {
                    if (errTallas) {
                        console.error("❌ Error al actualizar tallas/stock:", errTallas);
                        return res.status(500).json({ error: "Error al actualizar tallas/stock" });
                    }

                    console.log(`✅ Producto y tallas/stock actualizados correctamente (ID: ${idProducto})`);
                    return res.status(200).json({ mensaje: "Producto actualizado correctamente" });
                });
            });
        });
    } catch (err) {
        console.error("❌ Error inesperado en editarProducto:", err);
        return res.status(500).json({ error: "Error interno al actualizar el producto" });
    }
}
};

module.exports = ProductoController;
