import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductoCard } from "@/components/ui/ProductoCard";
import EditarProductoModal from "@/components/ui/EditarProductoModal";
import { List } from "lucide-react";
import { Star, StarOff } from "lucide-react";
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
  const [busqueda, setBusqueda] = useState("");
  

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    estado: 1,
    idCategoria: "",
    idMaterial: "",
    idPiedra: "",
    precioEspecial: null,
    destacado: 0,
    imagen: null,
  });

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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
    } else if (name === "precioEspecial") {
      setNuevoProducto({
        ...nuevoProducto,
        precioEspecial: value !== "" ? parseFloat(value) : null,
      });
    }
    else if (name === "destacado") {
      setNuevoProducto({
        ...nuevoProducto,
        destacado: parseInt(value, 10), //Fuerza a número
      });
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
      formData.append("precioEspecial", nuevoProducto.precioEspecial !== "" && nuevoProducto.precioEspecial !== undefined ? nuevoProducto.precioEspecial : "");
      formData.append("destacado", nuevoProducto.destacado ? 1 : 0);


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
        alert("Producto agregado exitosamente");

        //Limpiar formulario
        setNuevoProducto({
          nombre: "",
          precio: "",
          descripcion: "",
          estado: 1,
          idCategoria: "",
          idMaterial: "",
          idPiedra: "",
          precioEspecial: null,
          destacado: 0,
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


  return (
    <div className="flex flex-col h-screen px-4 py-6">
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
          className={`fixed top-6 left-7 z-50 p-3 rounded-full shadow-lg transition duration-300
                   ${mostrarFormulario ? "bg-[#8C162A] hover:bg-[#660022]" : "bg-[#BAD1C9] hover:bg-[#A1C1BE]"}
                  text-white`}
        >
          <List className="w-6 h-6" />
        </Button>

        {/*Barra de búsqueda */}
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="relative">
            {/* Ícono lupa */}
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            {/* Barra de búsqueda */}
            <input
              type="text"
              placeholder="Buscar productos ..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-[90%] border border-gray-300 rounded-full pl-10 pr-4 py-2 text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#8C162A] transition"
            />
          </div>
        </div>
      </div>


      {/* Contenedor de contenido en fila */}
      <div className="flex flex-1 overflow-hidden transition-all duration-500 gap-4">
        {/* Panel Izquierdo */}
        <div
          className={`transition-all duration-500 overflow-y-auto bg-white shadow-md p-6 mt-6 rounded-xl ${mostrarFormulario ? "w-full md:w-[500px]" : "w-0 hidden md:block"
            } scrollbar-none`}
        >
          {mostrarFormulario && (
            <div className="space-y-4">
              {/* Formulario en 2 columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 items-start">

                {/* Nombre */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Nombre</label>
                  <Input
                    name="nombre"
                    value={nuevoProducto.nombre}
                    onChange={handleChange}
                    placeholder=""
                    className="rounded-lg appearance-none text-[18px] font-medium leading-tight text-gray-700 placeholder:text-gray-400 border border-gray-400
    focus:border-gray-300 focus:ring-0
    transition-all duration-200 ease-out transform focus:scale-105"
                  />
                </div>

                {/* Precio */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Precio</label>
                  <div
                    className="flex items-center rounded-lg border border-gray-400 px-3 py-2
    focus-within:border-gray-300 focus-within:ring-0
    transition-all duration-200 ease-out transform focus-within:scale-105"
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
                          precio: rawValue ? parseInt(rawValue, 10) : "",
                        });
                      }}
                      placeholder="0.00"
                      autoComplete="off"
                      className="flex-1 bg-transparent border-none focus:outline-none text-base placeholder:text-gray-400 appearance-none"
                    />
                  </div>
                </div>


                {/* Precio Especial */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Precio Especial</label>
                  <div
                    className="flex items-center rounded-lg border border-gray-400 px-3 py-2
    focus-within:border-gray-300 focus-within:ring-0
    transition-all duration-200 ease-out transform focus-within:scale-105"
                  >
                    <span className="text-gray-500 mr-2">$</span>
                    <input
                      name="precioEspecial"
                      type="text"
                      value={nuevoProducto.precioEspecial?.toLocaleString("en-US") || ""}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/[^\d]/g, "");
                        setNuevoProducto({
                          ...nuevoProducto,
                          precioEspecial: rawValue ? parseInt(rawValue, 10) : "",
                        });
                      }}
                      placeholder="0.00"
                      autoComplete="off"
                      className="flex-1 bg-transparent border-none focus:outline-none text-base placeholder:text-gray-400 appearance-none"
                    />
                  </div>
                </div>


                {/* Estado */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Estado</label>
                  <Select
                    value={nuevoProducto.estado.toString()}
                    onValueChange={(value) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        estado: parseInt(value, 10),
                      })
                    }
                  >
                    <SelectTrigger
                      className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
      focus:border-gray-500 focus:ring-0
      transition-all duration-200 ease-out transform focus:scale-105 appearance-none"
                    >
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                      <SelectItem
                        value="1"
                        className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
        text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                      >
                        Disponible
                      </SelectItem>
                      <SelectItem
                        value="0"
                        className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
        text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                      >
                        No Disponible
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                {/* Destacado */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Destacar</label>
                  <button
                    type="button"
                    onClick={() =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        destacado: nuevoProducto.destacado === 1 ? 0 : 1,
                      })
                    }
                    className="flex items-center justify-center w-full rounded-lg text-[16px] font-normal border border-gray-400 px-3 py-2
              focus:border-gray-500 focus:ring-0
              transition-all duration-200 ease-out transform focus:scale-105"
                  >
                    {nuevoProducto.destacado === 1 ? (
                      <Star className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <StarOff className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="ml-2">
                      {nuevoProducto.destacado === 1 ? "Destacado" : "Sin destacar"}
                    </span>
                  </button>
                </div>

                {/* Categoría */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Categorías</label>
                  <Select
                    value={nuevoProducto.idCategoria}
                    onValueChange={(value) =>
                      setNuevoProducto({ ...nuevoProducto, idCategoria: value })
                    }
                  >
                    <SelectTrigger
                      className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
                focus:border-gray-500 focus:ring-0
                transition-all duration-200 ease-out transform focus:scale-105 appearance-none"
                    >
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                      {categorias.map((cat) => (
                        <SelectItem
                          key={cat.idCategoria}
                          value={cat.idCategoria}
                          className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"

                        >
                          {cat.nombre}
                        </SelectItem>

                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Material */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Materiales</label>
                  <Select
                    value={nuevoProducto.idMaterial}
                    onValueChange={(value) =>
                      setNuevoProducto({ ...nuevoProducto, idMaterial: value })
                    }
                  >
                    <SelectTrigger
                      className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
                focus:border-gray-500 focus:ring-0
                transition-all duration-200 ease-out transform focus:scale-105 appearance-none"
                    >
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                      {materiales.map((mat) => (
                        <SelectItem
                          key={mat.idMaterial}
                          value={mat.idMaterial}
                          className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                        >
                          {mat.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Piedra */}
                <div className="flex flex-col">
                  <label className="text-gray-800 font-semibold text-base mb-1">Piedras</label>
                  <Select
                    value={nuevoProducto.idPiedra}
                    onValueChange={(value) =>
                      setNuevoProducto({ ...nuevoProducto, idPiedra: value })
                    }
                  >
                    <SelectTrigger
                      className="w-full rounded-lg text-[15px] font-normal border border-gray-400 px-3 py-2
                focus:border-gray-500 focus:ring-0
                transition-all duration-200 ease-out transform focus:scale-105 appearance-none"
                    >
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border rounded-lg shadow-lg">
                      {piedras.map((pie) => (
                        <SelectItem
                          key={pie.idPiedra}
                          value={pie.idPiedra}
                          className="flex justify-center items-center hover:bg-gray-100 focus:bg-gray-200
                          text-[16px] font-medium text-gray-600 rounded-full px-3 py-1 transition-all duration-200"
                        >
                          {pie.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>


                {/* Tallas o Stock */}
                <div className="md:col-span-2">
                  {categorias.find(
                    (c) => c.idCategoria === nuevoProducto.idCategoria
                  )?.nombre === "Anillos" ? (
                    <>
                      <label className="block text-gray-800 font-semibold text-base mb-1 text-center">
                        Tallas y Stock
                      </label>
                      <div className="grid grid-cols-2 gap-4 justify-center">
                        {tallas.map((talla) => (
                          <div
                            key={talla.idTalla}
                            className="flex flex-col items-center space-y-1"
                          >
                            <span className="text-base font-medium">{talla.tamanio}</span>
                            <input
                              type="number"
                              min="0"
                              placeholder="Stock"
                              onChange={(e) => {
                                const stock = parseInt(e.target.value, 10) || 0;
                                setTallasSeleccionadas((prev) => {
                                  const existe = prev.find(
                                    (t) => t.idTalla === talla.idTalla
                                  );
                                  if (existe) {
                                    return prev.map((t) =>
                                      t.idTalla === talla.idTalla
                                        ? { ...t, stock }
                                        : t
                                    );
                                  } else {
                                    return [...prev, { idTalla: talla.idTalla, stock }];
                                  }
                                });
                              }}
                              className="text-center rounded-lg text-base border border-gray-400 px-2 py-1
          focus:outline-none focus:border-gray-300 focus:ring-0
          transition-all duration-200 ease-out transform focus:scale-105
          appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </div>
                        ))}
                      </div>
                    </>

                  ) : (
                    <>
                      <label className="block text-gray-800 font-semibold text-base mb-1 text-center">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={stockGeneral}
                        onChange={(e) =>
                          setStockGeneral(parseInt(e.target.value, 10) || "")
                        }
                        className="block mx-auto text-center rounded-lg text-base border border-gray-400 px-3 py-2
  focus:outline-none focus:border-gray-300 focus:ring-0
  transition-all duration-200 ease-out transform focus:scale-105
  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                      />


                    </>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-800 font-medium text-base mb-1">Imagen</label>
                  <Input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-400 px-3 py-2 text-gray-700
    focus:outline-none focus:border-gray-300 focus:ring-0
    transition-all duration-200 ease-out transform focus:scale-105"
                  />
                </div>


                {/* Descripción */}
                <div className="md:col-span-2">
                  <label className="block text-gray-800 font-medium text-base mb-1">Descripción</label>
                  <Textarea
                    name="descripcion"
                    value={nuevoProducto.descripcion}
                    onChange={handleChange}
                    rows={2}
                    placeholder=""
                    className="w-full rounded-lg border border-gray-400 px-3 py-2
    text-[16px] font-medium text-black placeholder:text-gray-500
    focus:outline-none focus:border-gray-500
    transition-all duration-200 ease-out transform focus:scale-105"
                  />
                </div>


              </div>

              {/* Botón Guardar */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleGuardar}
                  className="bg-[#8C162A] hover:bg-[#660022] text-white px-6 py-2 rounded-full shadow-md
            transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#BAD1C9]"
                >
                  Guardar
                </Button>
              </div>
            </div>
          )}
        </div>


        {/* Panel Derecho */}
        <div
          className="flex-1 transition-all duration-500 overflow-y-auto bg-white p-7 mt-12 scrollbar-none"
        >
          <div className="grid grid-rows-3 gap-y-8">
            {/* Fila 1 */}
            <div
              className="flex gap-x-6 overflow-x-auto scrollbar-none snap-proximity scroll-smooth"
            >
              {productos
                .filter((_, index) => index % 3 === 0) // productos para la fila 1
                .map((producto) => (
                  <div
                    key={producto.idProducto}
                    className="flex-none w-[calc(100%/4-1.5rem)] snap-start"
                  >
                    <ProductoCard
                      producto={producto}
                      onProductoActualizado={obtenerProductos}
                      onEditar={(productoSeleccionado) => {
                        setProductoEditar(productoSeleccionado);
                        setMostrarModal(true);
                      }}
                    />
                  </div>
                ))}
            </div>

            {/* Fila 2 */}
            <div
              className="flex gap-x-6 overflow-x-auto scrollbar-none snap-proximity scroll-smooth"
            >
              {productos
                .filter((_, index) => index % 3 === 1) // productos para la fila 2
                .map((producto) => (
                  <div
                    key={producto.idProducto}
                    className="flex-none w-[calc(100%/4-1.5rem)] snap-start"
                  >
                    <ProductoCard
                      producto={producto}
                      onProductoActualizado={obtenerProductos}
                      onEditar={(productoSeleccionado) => {
                        setProductoEditar(productoSeleccionado);
                        setMostrarModal(true);
                      }}

                    />
                  </div>
                ))}
            </div>

            {/* Fila 3 */}
            <div
              className="flex gap-x-6 overflow-x-auto scrollbar-none snap-proximity scroll-smooth"
            >
              {productos
                .filter((_, index) => index % 3 === 2) // productos para la fila 3
                .map((producto) => (
                  <div
                    key={producto.idProducto}
                    className="flex-none w-[calc(100%/4-1.5rem)] snap-start"
                  >
                    <ProductoCard
                      producto={producto}
                      onProductoActualizado={obtenerProductos}
                      onEditar={(productoSeleccionado) => {
                        setProductoEditar(productoSeleccionado);
                        setMostrarModal(true);
                      }}
                    />
                  </div>
                ))}
            </div>
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
