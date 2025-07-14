import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductoCard } from "@/components/ui/ProductoCard";
import EditarProductoModal from "@/components/ui/EditarProductoModal";
import { List } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 
 
export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [piedras, setPiedras] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productoEditar, setProductoEditar] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tallasSeleccionadas, setTallasSeleccionadas] = useState([]);
    const [stockGeneral, setStockGeneral] = useState("");
 
 
 
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        estado: 1, // Default
        idCategoria: "",
        idMaterial: "",
        idPiedra: "",
        imagen: null,
    });
 
    // Traer productos al cargar
    const obtenerProductos = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/productos/todos");
            setProductos(response.data);
 
            console.log("Productos cargados:", response.data);
 
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    };
 
    // Traer datos fijos
    const obtenerDatosSelect = async () => {
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
        } catch (error) {
            console.error("Error al cargar datos select:", error);
        }
    };
 
    useEffect(() => {
        obtenerProductos();
        obtenerDatosSelect();
    }, []);
 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
 
        if (name === "imagen") {
            setNuevoProducto({ ...nuevoProducto, imagen: files[0] });
        } else if (name === "estado") {
            setNuevoProducto({ ...nuevoProducto, estado: value === "1" ? 1 : 0 });
 
        } else if (name === "idCategoria") {
            setNuevoProducto({ ...nuevoProducto, [name]: value });
            const categoriaSeleccionada = categorias.find((c) => c.idCategoria === value);
            if (categoriaSeleccionada?.nombre !== "Anillos") {
                setTallasSeleccionadas([]);
                setStockGeneral(""); // reset stock general
            }
        } else {
            setNuevoProducto({ ...nuevoProducto, [name]: value });
        }
    };
 
 
    // Guardar producto con imagen
    const handleGuardar = async () => {
        try {
            if (
                !nuevoProducto.nombre ||
                !nuevoProducto.precio ||
                !nuevoProducto.idCategoria ||
                !nuevoProducto.idMaterial ||
                !nuevoProducto.idPiedra ||
                !nuevoProducto.imagen
            ) {
                alert("Todos los campos son obligatorios");
                return;
            }
            const categoriaSeleccionada = categorias.find(
                (c) => c.idCategoria === nuevoProducto.idCategoria
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
            formData.append("nombre", nuevoProducto.nombre);
            formData.append("precio", nuevoProducto.precio);
            formData.append("descripcion", nuevoProducto.descripcion);
            formData.append("idCategoria", nuevoProducto.idCategoria);
            formData.append("idMaterial", nuevoProducto.idMaterial);
            formData.append("idPiedra", nuevoProducto.idPiedra);
            formData.append("estado", nuevoProducto.estado);
            formData.append("imagen", nuevoProducto.imagen);
 
            if (categoriaSeleccionada?.nombre === "Anillos") {
                formData.append("tallas", JSON.stringify(tallasSeleccionadas));
            } else {
                formData.append("stock", stockGeneral);
            }
 
            // POST al backend
            const response = await axios.post(
                "http://localhost:4000/api/productos/agregar",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
 
            if (response.status === 201) {
                alert("✅ Producto agregado exitosamente");
 
                // 🧹 Limpiar formulario
                setNuevoProducto({
                    nombre: "",
                    precio: "",
                    descripcion: "",
                    estado: 1,
                    idCategoria: "",
                    idMaterial: "",
                    idPiedra: "",
                    imagen: null,
                });
                setTallasSeleccionadas([]);
                setStockGeneral("");
 
                obtenerProductos(); // Actualizar lista
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
            alert("Hubo un error al guardar el producto");
        }
    };
 
 
    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await axios.delete(`http://localhost:4000/api/productos/borrar/${id}`);
                alert("Producto eliminado");
                obtenerProductos();
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error al eliminar el producto");
            }
        }
    };
 
    return (
        <div className="flex flex-col h-screen px-4 py-6">
            {/* Botón estilo cabecera */}
            <div className="relative">
                <Button
                    onClick={() => {
                        setMostrarFormulario((prev) => {
                            const nuevoEstado = !prev;
                            if (nuevoEstado) {
                                setNuevoProducto({
                                    nombre: "",
                                    precio: "",
                                    descripcion: "",
                                    estado: 1,
                                    idCategoria: "",
                                    idMaterial: "",
                                    idPiedra: "",
                                    idTalla: "",
                                    imagen: null,
                                });
                            }
                            return nuevoEstado;
                        });
                    }}
                    className={`fixed top-6 left-6 z-50 p-3 rounded-full shadow-lg transition duration-300
      ${mostrarFormulario ? "bg-[#8C162A] hover:bg-[#660022]" : "bg-[#BAD1C9] hover:bg-[#A1C1BE]"}
      text-white`}
                >
                    <List className="w-6 h-6" />
                </Button>
 
            </div>
 
            {/* Contenedor de contenido en fila */}
            <div className="flex flex-1 overflow-hidden transition-all duration-500 gap-4">
 
                {/* 📋 Panel Izquierdo: Formulario desplegable */}
                <div className={`transition-all duration-500 overflow-y-auto bg-white shadow-md p-6 mt-10 rounded-xl ${mostrarFormulario ? "w-full md:w-[450px]" : "w-0 hidden md:block"}`}>
                    {mostrarFormulario && (
                        <div className="space-y-4">
                            {/* Formulario en 2 columnas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 
                                {/* Campo Nombre */}
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-700 font-medium text-base">Nombre</label>
                                    <Input
                                        name="nombre"
                                        value={nuevoProducto.nombre}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C162A] transition text-base"
 
                                    />
                                </div>
 
                                {/* Campo Precio */}
                                <div className="flex flex-col space-y-1">
                                    <label className="text-gray-700 font-medium text-base">Precio</label>
                                    <div
                                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#8C162A] transition"
                                    >
                                        <span className="text-gray-500 mr-2">$</span>
                                        <input
                                            name="precio"
                                            type="text"
                                            value={nuevoProducto.precio.toLocaleString("en-US")}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/[^\d]/g, "");
                                                setNuevoProducto({
                                                    ...nuevoProducto,
                                                    precio: rawValue ? parseInt(rawValue, 10) : ""
                                                });
                                            }}
                                            className="flex-1 bg-transparent  border-gray-300 rounded-md focus:outline-none text-gray-700 placeholder-gray-400 text-base"
                                            placeholder="0.00"
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
 
 
 
                                {/* Estado */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Estado</label>
                                    <select
                                        name="estado"
                                        value={nuevoProducto.estado} // 👈 usa el valor real (1 o 0)
                                        onChange={(e) =>
                                            setNuevoProducto({
                                                ...nuevoProducto,
                                                estado: parseInt(e.target.value, 10), // 👈 convierte string a número
                                            })
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8C162A]"
                                    >
                                        <option value={1}>Disponible</option>
                                        <option value={0}>No Disponible</option>
                                    </select>
                                </div>
 
 
 
                                {/* Categoría */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Categoría</label>
                                    <Select
                                        value={nuevoProducto.idCategoria}
                                        onValueChange={(value) => setNuevoProducto({ ...nuevoProducto, idCategoria: value })}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#8C162A]">
                                            <SelectValue placeholder />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border rounded-lg shadow-lg">
                                            {categorias.map((cat) => (
                                                <SelectItem
                                                    key={cat.idCategoria}
                                                    value={cat.idCategoria}
                                                    className="hover:bg-[#ECECEC] focus:bg-[#BAD1C9] text-gray-700"
                                                >
                                                    {cat.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
 
 
                                {/* Material */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Material</label>
                                    <Select
                                        value={nuevoProducto.idMaterial}
                                        onValueChange={(value) => setNuevoProducto({ ...nuevoProducto, idMaterial: value })}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#8C162A]">
                                            <SelectValue placeholder />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border rounded-lg shadow-lg">
                                            {materiales.map((mat) => (
                                                <SelectItem
                                                    key={mat.idMaterial}
                                                    value={mat.idMaterial}
                                                    className="hover:bg-[#ECECEC] focus:bg-[#BAD1C9] text-gray-700"
                                                >
                                                    {mat.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
 
 
                                {/* Piedra */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Piedra</label>
                                    <Select
                                        value={nuevoProducto.idPiedra}
                                        onValueChange={(value) => setNuevoProducto({ ...nuevoProducto, idPiedra: value })}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#8C162A]">
                                            <SelectValue placeholder />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border rounded-lg shadow-lg">
                                            {piedras.map((pie) => (
                                                <SelectItem
                                                    key={pie.idPiedra}
                                                    value={pie.idPiedra}
                                                    className="hover:bg-[#ECECEC] focus:bg-[#BAD1C9] text-gray-700"
                                                >
                                                    {pie.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
 
 
                                {/* 📏 Tallas o Stock */}
                                <div className="md:col-span-2">
                                    {categorias.find((c) => c.idCategoria === nuevoProducto.idCategoria)?.nombre === "Anillos" ? (
                                        <>
                                            <label className="block text-gray-700 font-medium">Tallas y Stock</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {tallas.map((talla) => (
                                                    <div key={talla.idTalla} className="flex items-center gap-2">
                                                        <span>{talla.tamanio}</span>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            placeholder="Stock"
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
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <label className="block text-gray-700 font-medium">Stock</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={stockGeneral}
                                                onChange={(e) => setStockGeneral(parseInt(e.target.value, 10) || "")}
                                                className="w-full border rounded px-3 py-2"
                                            />
                                        </>
                                    )}
                                </div>
 
 
                                {/* Imagen */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium">Imagen</label>
                                    <Input
                                        type="file"
                                        name="imagen"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#8C162A] transition"
 
                                    />
                                </div>
 
                                {/* Descripción */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium">Descripción</label>
                                    <Textarea
                                        name="descripcion"
                                        value={nuevoProducto.descripcion}
                                        onChange={handleChange}
                                        rows={2}
                                        className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#8C162A] transition"
                                    />
                                </div>
                            </div>
 
                            {/* Botón Guardar */}
                            <div className="flex justify-center mt-4">
                                <Button
                                    onClick={handleGuardar}
                                    className="bg-[#8C162A] hover:bg-[#660022] text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9]"
                                >
                                    Guardar
                                </Button>
                            </div>
 
                        </div>
                    )}
                </div>
 
                {/* 🖼 Panel Derecho: Productos */}
                <div className={`flex-1 transition-all duration-500 overflow-y-auto bg-white p-7 mt-12`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x- gap-y-8">
                        {productos.map((producto) => (
                            <ProductoCard
                                key={producto.idProducto}
                                producto={producto}
                                onProductoActualizado={obtenerProductos}
                                onEditar={(productoSeleccionado) => {
                                    setProductoEditar(productoSeleccionado);
                                    setMostrarModal(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
 
            {/* Modal editar */}
            {mostrarModal && (
                <EditarProductoModal
                    producto={productoEditar}
                    onCerrar={() => setMostrarModal(false)}
                    onProductoActualizado={obtenerProductos}
                />
            )}
        </div>
 
 
 
    );
}