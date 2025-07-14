import { useEffect, useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
 
 
 
export default function EditarProductoModal({ producto, onCerrar, onProductoActualizado }) {
 
 
    const [form, setForm] = useState({
        ...producto, imagen: null,
        estado: parseInt(producto.estado, 10) === 1 ? 1 : 0,
    });
    const [categorias, setCategorias] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [piedras, setPiedras] = useState([]);
    const [tallasSeleccionadas, setTallasSeleccionadas] = useState(producto.tallas || []);
    const [stockGeneral, setStockGeneral] = useState(0);
    const [tallas, setTallas] = useState([]);
 
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [catRes, matRes, pieRes, talRes] = await Promise.all([
                    axios.get("http://localhost:4000/api/categorias"),
                    axios.get("http://localhost:4000/api/materiales"),
                    axios.get("http://localhost:4000/api/piedras"),
                    axios.get("http://localhost:4000/api/tallas"),
                ]);
 
                setCategorias(catRes.data);
                setMateriales(matRes.data);
                setPiedras(pieRes.data);
                setTallas(talRes.data);
 
                const categoriaActual = catRes.data.find(c => c.idCategoria === producto.idCategoria);
 
                if (categoriaActual?.nombre === "Anillos") {
                    setTallasSeleccionadas(producto.tallas || []);
                    setStockGeneral(0);
                } else {
                    const stock = producto.stock ?? 0; // 👈 usa producto.stock
                    setStockGeneral(stock);
                    setTallasSeleccionadas([]);
                }
 
            } catch (error) {
                console.error("❌ Error al cargar datos:", error);
            }
        };
 
        cargarDatos();
    }, [producto]);
 
 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
 
        if (name === "imagen") {
            setForm({ ...form, imagen: files[0] });
        } else if (name === "estado") {
            setForm({ ...form, estado: parseInt(value, 10) });
        } else if (name === "idCategoria") {
            setForm({ ...form, [name]: value });
 
            const categoriaSeleccionada = categorias.find((c) => c.idCategoria === value);
 
            if (categoriaSeleccionada?.nombre !== "Anillos") {
                setTallasSeleccionadas([]);
                setStockGeneral(""); // ✅ RESETEAR stockGeneral si cambia categoría
            }
        }
        // 🆕 Agrega esta condición para stockGeneral:
        else if (name === "stockGeneral") {
            const rawValue = value.replace(/[^\d]/g, ""); // ✅ Solo números
            setStockGeneral(rawValue ? parseInt(rawValue, 10) : 0);
        }
        else {
            setForm({ ...form, [name]: value });
        }
    };
 
    const handleGuardar = async () => {
        try {
            if (!form.nombre || !form.precio || !form.descripcion) {
                alert("Todos los campos son obligatorios");
                return;
            }
            const categoriaSeleccionada = categorias.find(
                (c) => c.idCategoria === form.idCategoria
            );
 
            if (categoriaSeleccionada?.nombre === "Anillos") {
                if (tallasSeleccionadas.length === 0) {
                    alert("Debes ingresar al menos una talla con su stock");
                    return;
                }
                if (tallasSeleccionadas.some((t) => t.stock < 0 || isNaN(t.stock))) {
                    alert("Verifica que todas las tallas tengan un stock válido");
                    return;
                }
            } else {
                if (!stockGeneral || stockGeneral < 0) {
                    alert("Debes ingresar un stock válido para esta categoría");
                    return;
                }
            }
 
            const formData = new FormData();
            formData.append("nombre", form.nombre);
            formData.append("estado", parseInt(form.estado, 10));
            formData.append("precio", form.precio);
            formData.append("idCategoria", form.idCategoria);
            formData.append("idPiedra", form.idPiedra);
            formData.append("idMaterial", form.idMaterial);
            formData.append("descripcion", form.descripcion);
            formData.append("stock", stockGeneral);
 
 
            if (form.imagen) {
                formData.append("imagen", form.imagen);
            }
            if (categoriaSeleccionada?.nombre === "Anillos") {
                formData.append("tallas", JSON.stringify(tallasSeleccionadas));
            }
 
            // PUT al backend
            await axios.put(
                `http://localhost:4000/api/productos/editar/${form.idProducto}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );
 
            alert("✅ Producto actualizado correctamente");
            onProductoActualizado();
            onCerrar();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Ocurrió un error al actualizar el producto");
        }
    };
 
    return (
 
        <Dialog open onOpenChange={onCerrar}>
            <DialogContent className="max-w-4xl bg-white p-6 rounded-lg shadow-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-red-800 mb-4">Editar Producto</DialogTitle>
                </DialogHeader>
 
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Columna izquierda: Formulario */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Nombre</label>
                            <Input name="nombre" value={form.nombre} onChange={handleChange} />
                        </div>
 
                        <div>
                            <label className="block text-gray-700 font-medium">Precio</label>
                            <Input name="precio" type="number" value={form.precio} onChange={handleChange} />
                        </div>
 
                        <div>
                            <label className="block text-gray-700 font-medium">Estado</label>
                            <select
                                name="estado"
                                value={form.estado}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8C162A]"
                            >
                                <option value={1}>Disponible</option>
                                <option value={0}>No Disponible</option>
                            </select>
                        </div>
 
                        <div>
                            <label className="block text-gray-700 font-medium">Categoría</label>
                            <select
                                name="idCategoria"
                                value={form.idCategoria}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {categorias.map((cat) => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        <div>
                            <label className="block text-gray-700 font-medium">Material</label>
                            <select
                                name="idMaterial"
                                value={form.idMaterial}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {materiales.map((mat) => (
                                    <option key={mat.idMaterial} value={mat.idMaterial}>
                                        {mat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        <div>
                            <label className="block text-gray-700 font-medium">Piedra</label>
                            <select
                                name="idPiedra"
                                value={form.idPiedra}
                                onChange={handleChange}
                                className="w-full border rounded p-2"
                            >
                                {piedras.map((pie) => (
                                    <option key={pie.idPiedra} value={pie.idPiedra}>
                                        {pie.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
 
                        {/* 📏 Tallas o Stock */}
                        <div className="md:col-span-2">
                            {categorias.find((c) => c.idCategoria === form.idCategoria)?.nombre === "Anillos" ? (
                                <>
                                    <label className="block text-gray-700 font-medium">Tallas y Stock</label>
                                    {tallas.map((talla) => {
                                        const seleccionada = tallasSeleccionadas.find((t) => t.idTalla === talla.idTalla);
                                        return (
                                            <div key={talla.idTalla} className="flex items-center gap-2">
                                                <span>{talla.tamanio}</span>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={seleccionada?.stock || 0}
                                                    onChange={(e) => {
                                                        const stock = parseInt(e.target.value, 10) || 0;
                                                        setTallasSeleccionadas((prev) => {
                                                            const existe = prev.find((t) => t.idTalla === talla.idTalla);
                                                            if (existe) {
                                                                return prev.map((t) =>
                                                                    t.idTalla === talla.idTalla ? { ...t, stock } : t
                                                                );
                                                            } else {
                                                                return [...prev, { idTalla: talla.idTalla, stock }];
                                                            }
                                                        });
                                                    }}
                                                    className="border rounded px-2 py-1 w-24"
                                                />
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <label className="block text-gray-700 font-medium">Stock</label>
                                    <input
                                        type="text"
                                        value={stockGeneral}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/[^\d]/g, ""); // Solo números
                                            setStockGeneral(rawValue ? parseInt(rawValue, 10) : 0);
                                        }}
                                        className="w-full border rounded px-3 py-2"
                                    />
 
                                </>
                            )}
                        </div>
 
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium">Descripción</label>
                            <Textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                rows={2}
                            />
                        </div>
 
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 font-medium">Cambiar Imagen</label>
                            <Input type="file" name="imagen" accept="image/*" onChange={handleChange} />
                        </div>
                    </div>
 
 
                    {/*Columna derecha: Vista previa */}
                    <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-inner">
                        <p className="text-sm text-gray-500 mb-2 font-medium">Vista previa</p>
 
                        {producto.image_url && (
                            <img
                                src={producto.image_url}
                                alt="Imagen actual"
                                className="w-full h-60 object-cover rounded mb-3"
                            />
                        )}
 
                        <p className="text-gray-800 text-sm">
                            <span className="font-semibold">Descripción:</span> {form.descripcion || "Sin descripción"}
                        </p>
                    </div>
                </div>
 
                <DialogFooter className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onCerrar}>
                        Cancelar
                    </Button>
                    <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={handleGuardar}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
 
        </Dialog>
    );
}