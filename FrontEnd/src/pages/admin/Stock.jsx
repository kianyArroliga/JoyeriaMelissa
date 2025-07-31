import { useEffect, useState } from "react"
import { StockCard } from "@/components/ui/StockCard";
import axios from "axios";


export default function Stock() {
  const [productos, setProductos] = useState([]);
  const [tallasGlobales, setTallasGlobales] = useState([]);
  const [visibleCounts, setVisibleCounts] = useState([4, 4, 4]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/productos/todos");
      const productosOrdenados = response.data.sort(
        (a, b) => a.idProducto - b.idProducto
      );
      setProductos(productosOrdenados);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  const obtenerTallas = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tallas");
      setTallasGlobales(response.data);
    } catch (error) {
      console.error("Error al cargar tallas:", error);
    }
  }

  useEffect(() => {
    obtenerProductos();
    obtenerTallas();
  }, []);

  const handleScrollFila = (filaIndex) => (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    if (scrollLeft + clientWidth >= scrollWidth - 50) {
      setVisibleCounts((prev) => {
        const updated = [...prev];
        const productosEnFila = productos.filter((_, i) => i % 3 === filaIndex);
        updated[filaIndex] = Math.min(updated[filaIndex] + 4, productosEnFila.length);
        return updated;
      });
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
  <>
    {/* Barra de bUsqueda */}
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
          placeholder="Buscar productos ..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-gray-300 rounded-full pl-9 pr-3 py-1.5 sm:py-2 text-sm sm:text-base text-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-[#8C162A] transition"
        />
      </div>
    </div>

    {/* Panel principal */}
    <div className="flex-1 overflow-y-auto max-h-screen bg-white pt-20 px-4 sm:px-6 md:px-7 pb-10 scrollbar-none">
      <div className="flex flex-col gap-y-6">
        {/* responsive celular*/}
        <div className="md:hidden flex flex-col gap-y-4">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div key={producto.idProducto}>
                <StockCard
                  producto={producto}
                  tallasGlobales={tallasGlobales}
                  onProductoActualizado={obtenerProductos}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center mt-4">No hay productos disponibles.</p>
          )}
        </div>

        {/* compu */}
        <div className="hidden md:flex flex-col gap-y-8 pl-8 lg:pl-14">
          {[0, 1, 2].map((filaIndex) => {
            const productosEnFila = productosFiltrados.filter(
              (_, i) => i % 3 === filaIndex
            );
            const visibles = productosEnFila.slice(0, visibleCounts[filaIndex]);

            return (
              <div
                key={filaIndex}
                className="flex gap-x-6 overflow-x-auto scrollbar-none snap-x snap-proximity scroll-smooth"
                style={{
                  minHeight: "16rem",
                  minWidth: "100%",
                }}
                onScroll={handleScrollFila(filaIndex)}
              >
                <div style={{ width: "1px", height: "1px", flexShrink: 0 }}></div>

                {visibles.length > 0 ? (
                  visibles.map((producto) => (
                    <div
                      key={producto.idProducto}
                      className="flex-none w-[calc(100%/4-1.5rem)] snap-start"
                    >
                      <StockCard
                        producto={producto}
                        tallasGlobales={tallasGlobales}
                        onProductoActualizado={obtenerProductos}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No hay productos en esta fila.</p>
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