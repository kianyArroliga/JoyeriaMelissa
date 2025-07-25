import { useEffect, useState } from "react"
import axios from "axios"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Star, StarOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function EditarProductoModal({ producto, onCerrar, onProductoActualizado }) {


    const [form, setForm] = useState({
        ...producto, imagen: null,
        estado: parseInt(producto.estado, 10) === 1 ? 1 : 0,
        precioEspecial: producto.precioEspecial ?? "",
        destacado: producto.destacado ?? 0,
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
                    const stock = producto.stock ?? 0; //usa producto.stock
                    setStockGeneral(stock);
                    setTallasSeleccionadas([]);
                }

            } catch (error) {
                console.error(" Error al cargar datos:", error);
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
                setStockGeneral(""); // resetear stockGeneral si cambia categoría
            }
        } else if (name === "precioEspecial") {
            setForm({
                ...form,
                precioEspecial: value !== "" ? parseFloat(value) : null,
            });
        } else if (name === "destacado") {
            setForm({
                ...form,
                destacado: parseInt(value, 10),
            });
        } else if (name === "stockGeneral") {
            const rawValue = value.replace(/[^\d]/g, ""); // solo números
            setStockGeneral(rawValue ? parseInt(rawValue, 10) : 0);
        } else {
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
            formData.append("precioEspecial", form.precioEspecial !== "" && form.precioEspecial !== undefined ? form.precioEspecial : "");
            formData.append("destacado", form.destacado ? 1 : 0);


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

            alert("Producto actualizado correctamente");
            onProductoActualizado();
            onCerrar();
        } catch (error) {
            console.error("Error al actualizar producto:", error);
            alert("Ocurrió un error al actualizar el producto");
        }
    };

    

    return (

        <Dialog open onOpenChange={onCerrar}>
            <DialogContent className="max-w-4xl bg-white p-6 rounded-2xl shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row gap-4 flex-1 justify-start">
                    {/* Columna izquierda: Formulario */}
                    <div
                        className={`flex-[1.3] grid grid-cols-1 md:grid-cols-2 gap-3 transform translate-y-3 ${categorias.find((c) => c.idCategoria === form.idCategoria)?.nombre === "Anillos" ? "max-h-[600px] overflow-y-auto scrollbar-none" : ""}`} >

                        {/* Nombre */}
                        <div className="flex flex-col ">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Nombre</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <Input
                                    name="nombre"
                                    value={form.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre del producto"
                                    className="w-full rounded-lg border-none px-3 py-2 text-[15px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                                />
                            </div>
                        </div>


                        {/* Precio */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Precio</label>
                            <div
                                className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <span className="text-gray-500 mr-2">$</span>
                                <input
                                    name="precio"
                                    type="text"
                                    value={form.precio}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent text-[15px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Precio Especial */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Precio Especial</label>
                            <div
                                className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <span className="text-gray-500 mr-2">$</span>
                                <input
                                    name="precioEspecial"
                                    type="text"
                                    value={form.precioEspecial?.toLocaleString("en-US") || ""}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                                        setForm({
                                            ...form,
                                            precioEspecial: rawValue ? parseFloat(rawValue) : null,
                                        });
                                    }}
                                    className="flex-1 bg-transparent text-[15px] font-medium text-gray-700 placeholder-gray-400 focus:outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        {/* Estado */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Estado</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <Select
                                    value={form.estado.toString()}
                                    onValueChange={(value) =>
                                        setForm({
                                            ...form,
                                            estado: parseInt(value, 10),
                                        })
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full rounded-lg text-[15px] font-normal border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent transition duration-200 ease-out appearance-none"
                                    >
                                        <SelectValue placeholder="Seleccione un estado" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                                        <SelectItem
                                            value="1"
                                            className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200 text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"                                    >
                                            Disponible
                                        </SelectItem>
                                        <SelectItem
                                            value="0"
                                            className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200 text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"                                    >
                                            No Disponible
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Destacado */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Destacadar</label>
                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        destacado: form.destacado === 1 ? 0 : 1,
                                    })
                                }
                                className="flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-[15px] font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent transition duration-200 ease-out"
                            >
                                {form.destacado === 1 ? (
                                    <Star className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <StarOff className="w-5 h-5 text-gray-400" />
                                )}
                                <span className="ml-2">
                                    {form.destacado === 1 ? "Destacado" : "Sin destacar"}
                                </span>
                            </button>
                        </div>

                        {/* Categoría */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Categorías</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <Select
                                    value={form.idCategoria}
                                    onValueChange={(value) =>
                                        setForm({ ...form, idCategoria: value })
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full rounded-lg text-[15px] font-normal border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent transition duration-200 ease-out appearance-none"
                                    >
                                        <SelectValue placeholder="Seleccione una categoría" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                                        {categorias.map((cat) => (
                                            <SelectItem
                                                key={cat.idCategoria}
                                                value={cat.idCategoria}
                                                className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"                                        >
                                                {cat.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Material */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Materiales</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent
    transition duration-200 ease-out"
                            >
                                <Select
                                    value={form.idMaterial}
                                    onValueChange={(value) =>
                                        setForm({ ...form, idMaterial: value })
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full rounded-lg text-[15px] font-normal border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent
              transition duration-200 ease-out appearance-none"
                                    >
                                        <SelectValue placeholder="Seleccione un material" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                                        {materiales.map((mat) => (
                                            <SelectItem
                                                key={mat.idMaterial}
                                                value={mat.idMaterial}
                                                className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"                                        >
                                                {mat.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Piedra */}
                        <div className="flex flex-col">
                            <label className="text-gray-800 font-semibold text-[15px] mb-1">Piedras</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent
    transition duration-200 ease-out"
                            >
                                <Select
                                    value={form.idPiedra}
                                    onValueChange={(value) =>
                                        setForm({ ...form, idPiedra: value })
                                    }
                                >
                                    <SelectTrigger
                                        className="w-full rounded-lg text-[15px] font-normal border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent
              transition duration-200 ease-out appearance-none"
                                    >
                                        <SelectValue placeholder="Seleccione una piedra" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                                        {piedras.map((pie) => (
                                            <SelectItem
                                                key={pie.idPiedra}
                                                value={pie.idPiedra}
                                                className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"                                        >
                                                {pie.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* 📏 Tallas o Stock */}
                        <div className="md:col-span-2">
                            {categorias.find((c) => c.idCategoria === form.idCategoria)?.nombre === "Anillos" ? (
                                <>
                                    <label className="block text-gray-800 font-semibold text-[15px] mb-2 text-center">
                                        Tallas y Stock
                                    </label>

                                    {/* Contenedor scrollable */}
                                    <div
                                        className="grid grid-cols-2 gap-3 justify-center text-center"
                                    >
                                        {tallas.map((talla) => {
                                            const seleccionada = tallasSeleccionadas.find((t) => t.idTalla === talla.idTalla);
                                            return (
                                                <div
                                                    key={talla.idTalla}
                                                    className="flex flex-col justify-center items-center"
                                                >
                                                    <span className="text-[14px] font-medium text-gray-700">
                                                        {talla.tamanio}
                                                    </span>

                                                    <div
                                                        className="mt-1 w-full rounded-lg border border-gray-300
                focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent
                transition duration-200 ease-out"
                                                    >
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
                                                            className="block text-center w-full rounded-lg text-[14px] px-2 py-1 border-none
                  focus:outline-none appearance-none
                  [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <label className="block text-gray-800 font-semibold text-base mb-1 text-center">
                                            Stock
                                        </label>
                                        <div
                                            className="w-48 mx-auto rounded-lg border border-gray-400
    focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent
    transition duration-200 ease-out"
                                        >
                                            <input
                                                type="number"
                                                min="0"
                                                value={stockGeneral}
                                                onChange={(e) =>
                                                    setStockGeneral(parseInt(e.target.value, 10) || "")
                                                }
                                                className="w-full text-center rounded-lg text-base px-3 py-2 border-none text-gray-700
      focus:outline-none placeholder-gray-400
      appearance-none
      [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>


                                </>
                            )}
                        </div>


                        {/* Descripción */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-800 font-semibold text-[15px] mb-1">Descripción</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <Textarea
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Escribe una descripción del producto..."
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2
              text-[15px] font-medium text-black placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent
              transition duration-200 ease-out"
                                />
                            </div>
                        </div>


                        {/* Cambiar Imagen */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-800 font-semibold text-[15px] mb-1">Cambiar Imagen</label>
                            <div
                                className="rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-[#BAD1C9] focus-within:border-transparent transition duration-200 ease-out"
                            >
                                <Input
                                    type="file"
                                    name="imagen"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700
              focus:outline-none focus:ring-2 focus:ring-[#BAD1C9] focus:border-transparent
              transition duration-200 ease-out"
                                />
                            </div>
                        </div>
                    </div>

                    {/*Columna derecha: Vista previa */}
                    <div className="flex-[1.1] bg-white p-4 rounded-lg md:mt-11 relative">

                        <p className="text-sm text-gray-500 mb-2 font-medium">Vista previa</p>

                        {(form.imagen ? URL.createObjectURL(form.imagen) : producto.image_url) && (
                            <img
                                src={form.imagen ? URL.createObjectURL(form.imagen) : producto.image_url}
                                alt="Vista previa"
                                className="w-full h-70 object-cover rounded mb-6"
                            />
                        )}
                        <p className="text-gray-800 text-sm">
                            <span className="font-semibold">Descripción:</span> {form.descripcion || "Sin descripción"}
                        </p>

                        <div className="flex justify-center gap-3 translate-y-16">
                            <Button
                                onClick={handleGuardar}
                                className="bg-[#8C162A] hover:bg-[#660022] text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9]"
                            >
                                Cambiar
                            </Button>
                        </div>
                    </div>
                </div>


                <DialogFooter className="flex justify-end gap-3 h-[28px]">

                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}