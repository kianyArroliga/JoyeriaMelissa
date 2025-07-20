import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";

const PedidoEspecial = () => {
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.carrito.usuarioInfo);
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [piedras, setPiedras] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [descripcion, setDescripcion] = useState("");

  // Redireccion automatica a la pagina de login o registro 
  //  useEffect(() => { 
  //    if (!usuario || usuario.length === 0) { 
  //      navigate("/login"); 
  //    } 
  //  }, [usuario]); 

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const resCategorias = await fetch("http://localhost:4000/api/categorias");
        const resPiedras = await fetch("http://localhost:4000/api/piedras");
        const resMateriales = await fetch("http://localhost:4000/api/materiales");
        const dataCategorias = await resCategorias.json();
        const dataPiedras = await resPiedras.json();
        const dataMateriales = await resMateriales.json();

        setCategorias(dataCategorias);
        setPiedras(dataPiedras);
        setMateriales(dataMateriales);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };

    fetchDatos();
  }, []);

  const [pieza, setPieza] = useState("");
  const [talla, setTalla] = useState("");
  const [tipoPiedra, setTipoPiedra] = useState("");
  const [tipoMaterial, setTipoMaterial] = useState("");
  const [referencia, setReferencia] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReferencia(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pieza || !tipoPiedra || !tipoMaterial) {
      setMensaje("Por favor, complete todos los campos obligatorios.");
      setMensajeExito("");
      return;
    }

    // Validación especial para anillos 
    if (pieza === "Anillo" && (talla.trim() === "" || isNaN(talla))) {
      setMensaje("Por favor, indique una talla válida (solo números).");
      setMensajeExito("");
      return;
    }

    if (!usuario || usuario.length === 0) {
      setMensaje("Debe iniciar sesión o crear una cuenta para enviar un pedido especial.");
      setMensajeExito("");
      return;
    }

    const formData = new FormData();    
    formData.append("idUsuario", usuario[0].idUsuario); // 💡 
    formData.append("pieza", pieza);
    formData.append("talla", talla);
    formData.append("tipoPiedra", tipoPiedra);
    formData.append("descripcion", descripcion);

    if (referencia) {
      formData.append("referencia", referencia);
    }

    try {
      const response = await fetch("http://localhost:4000/api/pedidos-especiales/agregar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el pedido.");
      }

      setMensajeExito("¡Gracias! Hemos recibido tu solicitud de pedido especial. Nos pondremos en contacto contigo pronto por WhatsApp o correo.");
      setMensaje("");

      // Limpiar formulario 
      setPieza("");
      setTalla("");
      setTipoPiedra("");
      setMaterial("");
      setReferencia(null);
      setPreview(null);

      setTimeout(() => setMensajeExito(""), 5000);
    } catch (err) {
      setMensaje("Ocurrió un error: " + err.message);
      setMensajeExito("");
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Pedido Especial" prevLocation={prevLocation} />
      
      <div className="pb-10">
        <h1 className="text-2xl font-titleFont font-bold mb-6">Formulario de Pedido Especial</h1>

        {mensajeExito && <p className="text-green-600 mb-4">{mensajeExito}</p>}
        {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          {/* Pieza */}
          <label htmlFor="pieza" className="font-semibold block">
            Pieza (obligatorio):
            <select
              id="pieza"
              className="w-full border px-2 py-1 mt-1 block"
              value={pieza}
              onChange={(e) => setPieza(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              {categorias.map(cat => (
                <option key={cat.idCategoria} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </label>

          {/* Talla si es anillo */}
          {pieza === "Anillo" && (
            <label htmlFor="talla" className="font-semibold">
              Talla (solo si es anillo):
              <input
                id="talla"
                className="w-full border px-2 py-1 mt-1"
                type="text"
                value={talla}
                onChange={(e) => {
                  const valor = e.target.value;

                  // Solo permitir números o vacío 
                  if (/^\d*$/.test(valor)) {
                    setTalla(valor);
                  }
                }}
                placeholder="Ej: 5, 6, 7, 8, etc..."
              />
            </label>
          )}

          {/* Tipo de piedra */}
          <label htmlFor="tipoPiedra" className="font-semibold block">
            Tipo de Piedra (obligatorio):
            <select
              id="tipoPiedra"
              className="w-full border px-2 py-1 mt-1 block"
              value={tipoPiedra}
              onChange={(e) => setTipoPiedra(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              {piedras.map(p => (
                <option key={p.idPiedra} value={p.nombre}>{p.nombre}</option>
              ))}
            </select>
          </label>

          {/* Tipo de material */}
          <label htmlFor="tipoMaterial" className="font-semibold block">
            Tipo de Material (obligatorio):
            <select
              id="tipoMaterial"
              className="w-full border px-2 py-1 mt-1 block"
              value={tipoMaterial}
              onChange={(e) => setTipoMaterial(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              {materiales.map(m => (
                <option key={m.idMaterial} value={m.nombre}>{m.nombre}</option>
              ))}
            </select>
          </label>

          {/* Descripcion del pedido especial */}
          <label htmlFor="descripcion" className="font-semibold">
            Descripción del producto (opcional):
            <textarea
              id="descripcion"
              className="w-full border px-2 py-1 mt-1"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe lo que deseas..."
            />
          </label>

          {/* Imagen de referencia */}
          <label htmlFor="referencia" className="font-semibold">
            Imagen de Referencia (opcional):
            <input
              id="referencia"
              type="file"
              accept="image/*"
              className="w-full border px-2 py-1 mt-1"
              onChange={handleFileChange}
            />
          </label>

          {/* Vista previa */}
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Vista previa:</p>
              <img src={preview} alt="Vista previa" className="w-40 h-40 object-cover rounded-md mt-2" />
            </div>
          )}

          {/* Botón de enviar */}
          <button
            type="submit"
            className="w-44 bg-primeColor text-white py-2 hover:bg-black duration-200"
          >
            Enviar Solicitud
          </button>
        </form>

      </div>
    </div>
  );
};

export default PedidoEspecial; 