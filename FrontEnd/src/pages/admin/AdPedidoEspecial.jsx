import { useState } from "react";
import { PedidoEspecialCard } from "@/components/ui/PedidoEspecialCard"

export default function AdPedidoEspecial() {
  const [busqueda, setBusqueda] = useState("");
  const [visibleCounts, setVisibleCounts] = useState([4, 4, 4]);
  const [tarjetaActivaEspecial, setTarjetaActivaEspecial] = useState(null);

  //  Lista principal  pendientes/aceptados
  const [pedidosEspeciales, setPedidosEspeciales] = useState([
    { cliente: "Ana López", pieza: "Collar personalizado", estado: "pendiente" },
    { cliente: "Lucía Vargas", pieza: "Grabado especial", estado: "pendiente" },
    { cliente: "Lucía Vargas", pieza: "Anillo diamante", estado: "pendiente" },
    { cliente: "Juan Pérez", pieza: "Collar oro", estado: "pendiente" },
    
  ]);

    // Lista de pedidos enviados
  const [pedidosEnviados, setPedidosEnviados] = useState([]);

  // aceptar pedido (cambia el estado dentro de pedidosEspeciales a "aceptado")
    const handleAceptarEspecial = (pedido) => {
    setPedidosEspeciales((prev) =>
      prev.map((p) =>
        p.cliente === pedido.cliente && p.pieza === pedido.pieza
          ? { ...p, estado: "aceptado" }
          : p
      )
    );
  };

  // enviar (mueve el pedido de pedidosEspeciales a pedidosEnviados)
  const handleEnviar = (pedido) => {
    const pedidoAEnviar = pedidosEspeciales.find(
      (p) => p.cliente === pedido.cliente && p.pieza === pedido.pieza
    );

    if (pedidoAEnviar) {
      // Agregar a enviados con estado "enviado"
      setPedidosEnviados((prev) => [...prev, { ...pedidoAEnviar, estado: "enviado" }]);
      // Sacarlo de pedidosEspeciales
      setPedidosEspeciales((prev) =>
        prev.filter(
          (p) => p.cliente !== pedido.cliente || p.pieza !== pedido.pieza
        )
      );
    }
  };

  // muestra todo los pedidos
  const pedidosTotales = [...pedidosEspeciales, ...pedidosEnviados];

  // Filtrar por cliente
  const pedidosFiltrados = pedidosTotales.filter((p) =>
    p.cliente.toLowerCase().includes(busqueda.toLowerCase())
  );

  //  scroll por fila
  const handleScrollFila = (filaIndex) => (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      setVisibleCounts((prev) => {
        const updated = [...prev];
        const pedidosEnFila = pedidosFiltrados.filter((_, i) => i % 3 === filaIndex);
        updated[filaIndex] = Math.min(updated[filaIndex] + 4, pedidosEnFila.length);
        return updated;
      });
    }
  };

  return (
    <>
      {/* Barra de busqueda */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-6 md:px-0 max-w-xs sm:max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
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
          <input
            type="text"
            placeholder="Buscar por cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-gray-300 rounded-full pl-9 pr-3 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#8C162A] transition"
          />
        </div>
      </div>

      {/* Panel principal */}
      <div className="flex-1 overflow-y-auto max-h-screen bg-white pt-20 px-4 sm:px-6 md:px-7 pb-10 scrollbar-none">
        <div className="flex flex-col gap-y-6">

          {/* celular */}
          <div className="md:hidden flex flex-col gap-y-4">
            {pedidosFiltrados.length > 0 ? (
              pedidosFiltrados.map((pedido, index) => (
                <PedidoEspecialCard
                  key={index}
                  cliente={pedido.cliente}
                  pieza={pedido.pieza}
                  index={index}
                  tarjetaActiva={tarjetaActivaEspecial}
                  setTarjetaActiva={setTarjetaActivaEspecial}
                  estado={pedido.estado}
                  onAceptar={handleAceptarEspecial}
                  onEnviar={handleEnviar}
                />
              ))
            ) : (
              <p className="text-gray-400 italic text-center mt-4">
                No hay pedidos enviados.
              </p>
            )}
          </div>

          {/* compu con filas */}
          <div className="hidden md:flex flex-col gap-y-8 pl-8 lg:pl-14">
            {[0, 1, 2].map((filaIndex) => {
              const pedidosEnFila = pedidosFiltrados.filter((_, i) => i % 3 === filaIndex);
              const visibles = pedidosEnFila.slice(0, visibleCounts[filaIndex]);

              return (
                <div
                  key={filaIndex}
                  className="flex gap-x-1 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-proximity scroll-smooth"
                  style={{ minHeight: "16rem", minWidth: "100%" }}
                  onScroll={handleScrollFila(filaIndex)}
                >
                  <div style={{ width: "1px", flexShrink: 0 }}></div>

                  {visibles.length > 0 ? (
                    visibles.map((pedido, index) => (
                      <div
                        key={index}
                        className={`flex-none w-[calc(100%/4-1.5rem)] snap-start transition-all duration-500 ${tarjetaActivaEspecial === `${filaIndex}-${index}` ? "mr-52" : ""
                          }`}
                      >
                        <PedidoEspecialCard
                          cliente={pedido.cliente}
                          pieza={pedido.pieza}
                          index={`${filaIndex}-${index}`}
                          tarjetaActiva={tarjetaActivaEspecial}
                          setTarjetaActiva={setTarjetaActivaEspecial}
                          estado={pedido.estado}
                          onAceptar={handleAceptarEspecial}
                          onEnviar={handleEnviar}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 italic">No hay pedidos en esta fila.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}