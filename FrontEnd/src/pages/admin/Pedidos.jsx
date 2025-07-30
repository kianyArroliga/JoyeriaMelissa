import { useState } from "react";
import { PedidoCard } from "@/components/ui/PedidoCard";

export default function Pedidos() {

    const [busqueda, setBusqueda] = useState("");
    const [visibleCounts, setVisibleCounts] = useState([4, 4, 4]);
    const [pedidosRegulares, setPedidosRegulares] = useState([
        { cliente: "Juan Pérez", producto: "Pulsera oro 18k" },
        { cliente: "Carlos Méndez", producto: "Anillo plata" },
        { cliente: "Lucía Vargas", producto: "Aretes de plata" },
        { cliente: "Pedro Torres", producto: "Collar de cuero" },
        { cliente: "Juan Pérez", producto: "Anillo de acero" },
        { cliente: "Carlos Méndez", producto: "Pulsera cuero" },
    ]);

    // Lista enviados
    const [pedidosEnviados, setPedidosEnviados] = useState([]);

    // Aceptar: cambia estado de pedidosRegulares a "aceptado"
    const handleAceptar = (pedido) => {
        setPedidosRegulares((prev) =>
            prev.map((p) =>
                p.cliente === pedido.cliente && p.producto === pedido.producto
                    ? { ...p, estado: "aceptado" }
                    : p
            )
        );
    };

    // Enviar: mueve de pedidosRegulares a pedidosEnviados
    const handleEnviar = (pedido) => {
        const pedidoAEnviar = pedidosRegulares.find(
            (p) => p.cliente === pedido.cliente && p.producto === pedido.producto
        );
        if (pedidoAEnviar) {
            setPedidosEnviados((prev) => [...prev, { ...pedidoAEnviar, estado: "enviado" }]);
            setPedidosRegulares((prev) =>
                prev.filter(
                    (p) => p.cliente !== pedido.cliente || p.producto !== pedido.producto
                )
            );
        }
    };

    // muestra todo los pedidos
    const pedidosTotales = [...pedidosRegulares, ...pedidosEnviados];

    // Filtrar por cliente
    const pedidosFiltrados = pedidosTotales.filter((p) =>
        p.cliente.toLowerCase().includes(busqueda.toLowerCase())
    );

    // scroll por fila
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
                        className="w-full border border-gray-300 rounded-full pl-9 pr-3 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#3a5b57] transition"
                    />
                </div>
            </div>

            {/* Panel principal */}
            <div className="flex-1 overflow-y-auto max-h-screen bg-white pt-20 px-4 sm:px-6 md:px-7 pb-10 scrollbar-none">
                <div className="flex flex-col gap-y-6">

                    {/* Celular */}
                    <div className="md:hidden flex flex-col gap-y-4">
                        {pedidosFiltrados.length > 0 ? (
                            pedidosFiltrados.map((pedido, index) => (
                                <PedidoCard
                                    key={index}
                                    cliente={pedido.cliente}
                                    producto={pedido.producto}
                                    estado={pedido.estado}
                                    onAceptar={handleAceptar}
                                    onEnviar={handleEnviar}
                                />
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-center mt-4">
                                No hay pedidos regulares.
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
                                                className="flex-none w-[calc(100%/4-1.5rem)] snap-start transition-all duration-500"
                                            >
                                                <PedidoCard
                                                    cliente={pedido.cliente}
                                                    producto={pedido.producto}
                                                    estado={pedido.estado}
                                                    onAceptar={handleAceptar}
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
