import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "@/components/ui/pageProps/Breadcrumbs";

import oro1 from "@/assets/images/products/Anillos/Oro/oro1.jpg";
import aretesRubi from "@/assets/images/products/Aretes/Plata/AretesColgarRubiSinteticoFormaGota.jpg";
import cadenaTresAros from "@/assets/images/products/Dijes-Cadenas/Plata/CadenaTresArosEntrelazadosPlata.jpg";
import pulseraAmazonita from "@/assets/images/products/Pulseras/Plata/PulseraPlataPerlasAmazonitaNatural.jpg";

const PedidoEspecial = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");

  useEffect(() => {
    setPrevLocation(location.state?.data || "");
  }, [location]);

  const [pieza, setPieza] = useState("");
  const [talla, setTalla] = useState("");
  const [tipoPiedra, setTipoPiedra] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pieza || !tipoPiedra) {
      setMensaje("Por favor, complete todos los campos obligatorios.");
      setMensajeExito("");
      return;
    }

    setMensajeExito("¡Gracias! Hemos recibido tu solicitud de pedido especial. Nos pondremos en contacto contigo pronto por WhatsApp o correo.");
    setMensaje("");

    // Limpiar formulario
    setPieza("");
    setTalla("");
    setTipoPiedra("");

    // Ocultar mensaje de éxito luego de 5 segundos
    setTimeout(() => setMensajeExito(""), 5000);
  };

  const renderEjemplo = () => {
    const imagenes = {
      Anillo: oro1,
      Aretes: aretesRubi,
      "Dije/Cadena": cadenaTresAros,
      Pulsera: pulseraAmazonita,
    };

    const img = imagenes[pieza];
    return img ? <img src={img} alt={`Ejemplo de ${pieza}`} className="w-40 h-40 object-cover rounded-md" /> : null;
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Pedido Especial" prevLocation={prevLocation} />

      <div className="pb-10">
        <h1 className="text-2xl font-titleFont font-bold mb-6">Formulario de Pedido Especial</h1>

        {mensajeExito && <p className="text-green-600 mb-4">{mensajeExito}</p>}
        {mensaje && <p className="text-red-500 mb-4">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
          <label htmlFor="pieza" className="font-semibold">
            Pieza*:
            <select
              id="pieza"
              className="w-full border px-2 py-1 mt-1"
              value={pieza}
              onChange={(e) => setPieza(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Aretes">Aretes</option>
              <option value="Pulsera">Pulsera</option>
              <option value="Dije/Cadena">Dije / Cadena</option>
              <option value="Anillo">Anillo</option>
            </select>
          </label>

          {pieza === "Anillo" && (
            <label htmlFor="talla" className="font-semibold">
              Talla (solo si es anillo):
              <input
                id="talla"
                className="w-full border px-2 py-1 mt-1"
                type="text"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
                placeholder="Ej: 6.5, 7, etc."
              />
            </label>
          )}

          <label htmlFor="tipoPiedra" className="font-semibold">
            Tipo de Piedra*:
            <select
              id="tipoPiedra"
              className="w-full border px-2 py-1 mt-1"
              value={tipoPiedra}
              onChange={(e) => setTipoPiedra(e.target.value)}
              required
            >
              <option value="">Seleccionar</option>
              <option value="Natural">Natural</option>
              <option value="Sintética">Sintética</option>
            </select>
          </label>

          <button
            type="submit"
            className="w-44 bg-primeColor text-white py-2 hover:bg-black duration-200"
          >
            Enviar Solicitud
          </button>
        </form>

        {pieza && (
          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2">Ejemplo de {pieza}:</h2>
            {renderEjemplo()}
          </div>
        )}
      </div>
    </div>
  );
};

export default PedidoEspecial;
